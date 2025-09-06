import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const REQUEST_TABS: string[] = ["params", "headers", "body", "auth"];
const RESPONSE_TABS: string[] = ["body", "headers"];

export default function RestClient() {
  return (
    <div className="flex flex-col gap-4 h-full bg-gray-900 text-white p-4">
      <div className="flex items-center gap-2 bg-gray-800 p-3 rounded">
        <select className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white cursor-pointer">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <Input
          placeholder="https://api.example.com"
          className="flex-1 text-sm bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
        />
        <Button className="px-6 bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white cursor-pointer">
          Send
        </Button>
      </div>

      <Tabs defaultValue="params" className="flex-1 flex flex-col">
        <TabsList className="w-fit mb-2 bg-gray-800 rounded">
          {REQUEST_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-white hover:bg-gray-700 data-[state=active]:bg-slate-400 data-[state=active]:text-gray-900"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="flex-1 border border-gray-700 rounded bg-gray-800 overflow-auto">
          <TabsContent value="params" className="p-4 text-sm text-gray-300">
            Add query parameters here…
          </TabsContent>
          <TabsContent value="headers" className="p-4 text-sm text-gray-300">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 mb-2">
                <Input
                  placeholder="Header Key"
                  className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  placeholder="Header Value"
                  className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button size="sm" className="bg-gray-600 hover:bg-gray-500 text-white">
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="body" className="p-4 text-sm text-gray-300">
            <textarea
              className="w-full h-48 bg-gray-700 border border-gray-600 rounded p-2 font-mono text-sm text-white placeholder-gray-400"
              placeholder="Enter JSON or text here…"
            />
          </TabsContent>

          <TabsContent value="auth" className="p-4 text-sm text-gray-300">
            Configure authentication here…
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex-1 flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Response</h2>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">Status:</span>
          <span className="text-sm text-gray-300">200 OK</span>
        </div>

        <Tabs defaultValue="body" className="flex-1 flex flex-col">
          <TabsList className="w-fit mb-2 bg-gray-800 rounded">
            {RESPONSE_TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="text-white hover:bg-gray-700 data-[state=active]:bg-slate-400 data-[state=active]:text-gray-900"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-1 border border-gray-700 rounded bg-gray-800 overflow-auto p-4 text-sm font-mono text-gray-300">
            <TabsContent value="body">Response body will appear here…</TabsContent>
            <TabsContent value="headers">Response headers will appear here…</TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
