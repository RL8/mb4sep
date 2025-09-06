-- =====================================================
-- SQL Script: Add New Tables for App Features
-- Database: Supabase (PostgreSQL)
-- Date: 2024-12-19
-- Purpose: Add 4 justified tables for new app features
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ARTIST REQUESTS TABLE
-- Purpose: Handle user-submitted artist requests
-- Justification: New feature, cannot be stored in existing tables
-- =====================================================

CREATE TABLE IF NOT EXISTS artist_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    artist_name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'duplicate')),
    vote_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_artist_requests_user_id ON artist_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_artist_requests_status ON artist_requests(status);
CREATE INDEX IF NOT EXISTS idx_artist_requests_created_at ON artist_requests(created_at DESC);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artist_requests_updated_at 
    BEFORE UPDATE ON artist_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. USER VOTES TABLE
-- Purpose: Handle voting on artist requests (many-to-many)
-- Justification: Normalization required for user-request voting relationship
-- =====================================================

CREATE TABLE IF NOT EXISTS user_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    request_id UUID NOT NULL REFERENCES artist_requests(id) ON DELETE CASCADE,
    vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Ensure one vote per user per request
    UNIQUE(user_id, request_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_votes_user_id ON user_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_votes_request_id ON user_votes(request_id);
CREATE INDEX IF NOT EXISTS idx_user_votes_vote_type ON user_votes(vote_type);

-- Add trigger for updated_at
CREATE TRIGGER update_user_votes_updated_at 
    BEFORE UPDATE ON user_votes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. USER PREDICTIONS TABLE
-- Purpose: Handle prediction game data
-- Justification: New feature, cannot be stored in existing tables
-- =====================================================

CREATE TABLE IF NOT EXISTS user_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    prediction_type TEXT NOT NULL CHECK (prediction_type IN ('album_release', 'song_feature', 'collaboration', 'tour_dates')),
    prediction_data JSONB NOT NULL,
    confidence_score NUMERIC(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'expired')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_predictions_user_id ON user_predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_predictions_type ON user_predictions(prediction_type);
CREATE INDEX IF NOT EXISTS idx_user_predictions_status ON user_predictions(status);
CREATE INDEX IF NOT EXISTS idx_user_predictions_created_at ON user_predictions(created_at DESC);

-- Add GIN index for JSONB queries
CREATE INDEX IF NOT EXISTS idx_user_predictions_data ON user_predictions USING GIN (prediction_data);

-- Add trigger for updated_at
CREATE TRIGGER update_user_predictions_updated_at 
    BEFORE UPDATE ON user_predictions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4. RANKING HISTORY TABLE
-- Purpose: Audit trail for ranking changes
-- Justification: Audit trail requirement, cannot be stored in ranking_items
-- =====================================================

CREATE TABLE IF NOT EXISTS ranking_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ranking_set_id UUID NOT NULL REFERENCES ranking_sets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    change_type TEXT NOT NULL CHECK (change_type IN ('create', 'update', 'delete', 'reorder')),
    previous_state JSONB,
    new_state JSONB,
    change_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_ranking_history_ranking_set_id ON ranking_history(ranking_set_id);
CREATE INDEX IF NOT EXISTS idx_ranking_history_user_id ON ranking_history(user_id);
CREATE INDEX IF NOT EXISTS idx_ranking_history_created_at ON ranking_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_history_change_type ON ranking_history(change_type);

-- Add GIN indexes for JSONB queries
CREATE INDEX IF NOT EXISTS idx_ranking_history_previous_state ON ranking_history USING GIN (previous_state);
CREATE INDEX IF NOT EXISTS idx_ranking_history_new_state ON ranking_history USING GIN (new_state);

-- =====================================================
-- ENHANCE EXISTING TABLES
-- Add columns to existing tables for additional functionality
-- =====================================================

-- Add activity tracking to ranking_sets
ALTER TABLE ranking_sets 
ADD COLUMN IF NOT EXISTS activity_type TEXT,
ADD COLUMN IF NOT EXISTS activity_data JSONB,
ADD COLUMN IF NOT EXISTS engagement_metrics JSONB;

-- Add indexes for new columns
CREATE INDEX IF NOT EXISTS idx_ranking_sets_activity_type ON ranking_sets(activity_type);
CREATE INDEX IF NOT EXISTS idx_ranking_sets_activity_data ON ranking_sets USING GIN (activity_data);
CREATE INDEX IF NOT EXISTS idx_ranking_sets_engagement_metrics ON ranking_sets USING GIN (engagement_metrics);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable RLS for security
-- =====================================================

-- Enable RLS on all new tables
ALTER TABLE artist_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ranking_history ENABLE ROW LEVEL SECURITY;

-- Artist Requests Policies
CREATE POLICY "Users can view all artist requests" ON artist_requests
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own artist requests" ON artist_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own artist requests" ON artist_requests
    FOR UPDATE USING (auth.uid() = user_id);

-- User Votes Policies
CREATE POLICY "Users can view all votes" ON user_votes
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own votes" ON user_votes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes" ON user_votes
    FOR UPDATE USING (auth.uid() = user_id);

-- User Predictions Policies
CREATE POLICY "Users can view all predictions" ON user_predictions
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own predictions" ON user_predictions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions" ON user_predictions
    FOR UPDATE USING (auth.uid() = user_id);

-- Ranking History Policies
CREATE POLICY "Users can view ranking history for their own rankings" ON ranking_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create ranking history for their own rankings" ON ranking_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS FOR VOTE COUNTING
-- Automatically update vote counts when votes are added/removed
-- =====================================================

-- Function to update vote count on artist_requests
CREATE OR REPLACE FUNCTION update_artist_request_vote_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE artist_requests 
        SET vote_count = vote_count + 1 
        WHERE id = NEW.request_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE artist_requests 
        SET vote_count = vote_count - 1 
        WHERE id = OLD.request_id;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Handle vote type changes (upvote to downvote, etc.)
        -- For now, we'll just update the timestamp
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for vote count updates
CREATE TRIGGER update_vote_count_on_insert
    AFTER INSERT ON user_votes
    FOR EACH ROW EXECUTE FUNCTION update_artist_request_vote_count();

CREATE TRIGGER update_vote_count_on_delete
    AFTER DELETE ON user_votes
    FOR EACH ROW EXECUTE FUNCTION update_artist_request_vote_count();

-- =====================================================
-- VERIFICATION QUERIES
-- Test that all tables were created successfully
-- =====================================================

-- Check if all tables exist
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('artist_requests', 'user_votes', 'user_predictions', 'ranking_history')
ORDER BY table_name;

-- Check if all indexes were created
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('artist_requests', 'user_votes', 'user_predictions', 'ranking_history')
ORDER BY tablename, indexname;

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('artist_requests', 'user_votes', 'user_predictions', 'ranking_history')
ORDER BY tablename;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Uncomment these lines to insert sample data for testing

/*
-- Sample artist request
INSERT INTO artist_requests (user_id, artist_name, description, status) 
VALUES (
    (SELECT id FROM auth.users LIMIT 1), 
    'Olivia Rodrigo', 
    'Would love to see Olivia Rodrigo added for her amazing songwriting and emotional depth!', 
    'pending'
);

-- Sample user prediction
INSERT INTO user_predictions (user_id, prediction_type, prediction_data, confidence_score) 
VALUES (
    (SELECT id FROM auth.users LIMIT 1),
    'album_release',
    '{"predicted_release_date": "2024-06-15", "album_name": "TS12", "predicted_tracks": 15}',
    0.85
);
*/

-- =====================================================
-- END OF SCRIPT
-- =====================================================

