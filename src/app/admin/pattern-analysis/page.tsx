import PatternAnalysisTable from '@/components/PatternAnalysisTable';

export default function PatternAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pattern Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Cross-feature analysis of component reuse, interaction patterns, and consistency across the application specification
        </p>
      </div>
      
      <PatternAnalysisTable />
    </div>
  );
}
