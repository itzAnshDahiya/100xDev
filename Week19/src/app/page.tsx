import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">🎯 TaskFlow</h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Manage Your Tasks <br />
          <span className="text-blue-600">Effortlessly</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          TaskFlow helps you organize, prioritize, and complete your tasks with ease.
          Boost your productivity with our intelligent task management system.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          Start For Free
        </Link>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Powerful Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">✓</div>
              <h4 className="text-xl font-semibold mb-2">Smart Tasks</h4>
              <p className="text-gray-600">
                Create, organize, and manage tasks with priorities, deadlines, and categories.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-2">Analytics</h4>
              <p className="text-gray-600">
                Track your progress with detailed insights and completion statistics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏷️</div>
              <h4 className="text-xl font-semibold mb-2">Categories</h4>
              <p className="text-gray-600">
                Organize tasks by custom categories to keep everything in order.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold mb-2">Fast & Responsive</h4>
              <p className="text-gray-600">
                Lightning-fast performance with a beautiful, responsive interface.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="text-xl font-semibold mb-2">Secure</h4>
              <p className="text-gray-600">
                Your data is encrypted and stored securely with robust authentication.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold mb-2">Mobile Friendly</h4>
              <p className="text-gray-600">
                Access your tasks anywhere with our fully responsive design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Boost Your Productivity?</h3>
        <p className="text-gray-600 mb-8 text-lg">
          Join thousands of users managing their tasks more effectively with TaskFlow.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>© 2024 TaskFlow. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
