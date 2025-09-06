import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function RestClient() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 bg-muted/50 p-3 rounded">
        <select className="bg-background border rounded px-2 py-1 text-sm">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <Input placeholder="https://api.example.com" className="flex-1 text-sm" />
        <Button className="px-6">Send</Button>
      </div>

      <Tabs defaultValue="params" className="flex-1 flex flex-col">
        <TabsList className="w-fit">
          <TabsTrigger value="params">Params</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="body">Body</TabsTrigger>
          <TabsTrigger value="auth">Auth</TabsTrigger>
        </TabsList>
        <div className="flex-1 border rounded bg-background overflow-auto">
          <TabsContent value="params" className="p-4 text-sm text-muted-foreground">
            Add query parameters here…
          </TabsContent>

          <TabsContent value="headers" className="p-4 text-sm text-muted-foreground">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input placeholder="Header Key" className="flex-1 text-sm" />
                <Input placeholder="Header Value" className="flex-1 text-sm" />
                <Button size="sm">Add</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="body" className="p-4 text-sm text-muted-foreground">
            <textarea
              className="w-full h-48 bg-background border rounded p-2 font-mono text-sm"
              placeholder="Enter JSON or text here…"
            />
          </TabsContent>

          <TabsContent value="auth" className="p-4 text-sm text-muted-foreground">
            Configure authentication here…
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Response</h2>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">Status:</span>
          <span className="text-sm text-muted-foreground">200 OK</span>
        </div>

        <Tabs defaultValue="body" className="flex-1 flex flex-col">
          <TabsList className="w-fit">
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
          </TabsList>
          <div className="flex-1 border rounded bg-background overflow-auto">
            <TabsContent value="body" className="p-4 text-sm font-mono text-muted-foreground">
              Response body will appear here…
            </TabsContent>
            <TabsContent value="headers" className="p-4 text-sm font-mono text-muted-foreground">
              Response headers will appear here…
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
