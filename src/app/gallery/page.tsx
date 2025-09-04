import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function GalleryPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Component Gallery</h1>
        <p className="text-muted-foreground">
          Visual showcase of all shadcn/ui components in the design system
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>
                A simple card with header and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area where you can place any content.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>
                Card with interactive elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter text..." />
              <Button className="w-full">Action Button</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Card</CardTitle>
              <CardDescription>
                Card showing different states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Inputs Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Input</label>
            <Input placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Disabled Input</label>
            <Input placeholder="Disabled" disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Input</label>
            <Input type="email" placeholder="user@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password Input</label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </div>
      </section>

      {/* Form Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Example</h2>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>
              Example form using shadcn/ui components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Input placeholder="Your message..." />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>
      </section>

      {/* Design System Info */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Design System Rules</h2>
        <Card>
          <CardHeader>
            <CardTitle>Enforcement Rules</CardTitle>
            <CardDescription>
              These rules are enforced via ESLint and code reviews
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>All UI components must use shadcn/ui primitives</li>
              <li>Import components from <code className="bg-muted px-1 rounded">@/components/ui/*</code></li>
              <li>No direct HTML elements where shadcn components exist</li>
              <li>Use the component gallery to test new components</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
