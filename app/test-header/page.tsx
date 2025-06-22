import LandingHeader from "@/components/landing/landing-header"

export default function TestHeaderPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <LandingHeader />
      <div className="pt-20 p-8">
        <h1 className="text-3xl font-bold mb-4">Header Test Page</h1>
        <p className="text-gray-600">
          这个页面用于测试header组件是否正常显示。如果你能看到顶部的导航栏，说明header组件工作正常。
        </p>
        <div className="mt-8 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">测试内容 1</h2>
            <p>这是第一个测试内容块。</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">测试内容 2</h2>
            <p>这是第二个测试内容块。</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">测试内容 3</h2>
            <p>这是第三个测试内容块。</p>
          </div>
        </div>
      </div>
    </div>
  )
} 