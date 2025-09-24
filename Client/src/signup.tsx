export const Signup = () => {
  return (
    <div className="h-full bg-slate-900 text-slate-100 font-sans">
      <header className="w-full border-b border-slate-800">
        <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="text-teal-400 tracking-widest font-semibold">
            NOMAD
          </div>
          <div
            aria-hidden="true"
            className="text-slate-500 text-sm hidden sm:block"
          >
            Ride smarter
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <figure className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src="/public/header-img.png"
              alt="Dark-themed ride-hailing app screens with teal accents"
              className="h-full w-full object-cover"
            />
          </figure>

          <section className="rounded-xl border border-slate-800 bg-slate-950/80 backdrop-blur p-6 md:p-8 lg:p-10 flex">
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-teal-500/90 text-slate-900 grid place-content-center font-bold">
                  N
                </div>
              </div>

              <div className="mt-4 text-center">
                <h1 className="text-2xl font-semibold leading-tight text-pretty">
                  Create your account
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Join Nomad to move faster, safer, and smarter.
                </p>
              </div>

              <form action="#" method="post" className="mt-6 grid gap-4">
                <div>
                  <label className="block text-sm mb-1 text-slate-300">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 px-3 py-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 px-3 py-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-slate-300">
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="+1 555 000 1234"
                    className="w-full rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 px-3 py-2.5"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 px-3 py-2.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-slate-300">
                      Confirm password
                    </label>
                    <input
                      id="confirm"
                      name="confirm"
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 px-3 py-2.5"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-teal-500 text-slate-900 font-semibold py-2.5 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-slate-900 transition"
                >
                  Sign up
                </button>

                <p className="text-center text-sm text-slate-400">
                  Already have an account?
                  <a
                    href="#"
                    className="text-teal-400 hover:text-teal-300 font-medium"
                  >
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </section>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
        © <span aria-hidden="true">2025</span> NOMAD. All rights reserved.
      </footer>
    </div>
  );
};
