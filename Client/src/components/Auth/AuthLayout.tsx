import type React from 'react';

export const AuthLayout = (props: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="h-full bg-white text-slate-100 font-sans">
      <header className="w-full border-b border-slate-800">
        <nav className="w-full px-10 py-4 flex items-center justify-between bg-black">
          <div className="text-white tracking-widest font-extrabold">NOMAD</div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <section className="grid grid-cols-1 md:grid-cols-2  items-stretch">
          <figure className="rounded-l-xl overflow-hidden ">
            <img
              src="/header-img.png"
              alt="Dark-themed ride-hailing app screens with teal accents"
              className="h-full w-full object-cover"
            />
          </figure>

          <section className="rounded-r-xl border border-l-0 border-slate-800 bg-white backdrop-blur p-6 md:p-8 lg:p-10 flex">
            <div className="w-full max-w-md mx-auto">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full grid place-content-center font-bold">
                  <img src="/nomad-logo.png" alt="" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <h1 className="text-2xl font-semibold text-gray-800 leading-tight text-pretty">
                  {props.title}
                </h1>
                <p className="mt-1 text-sm text-slate-400">{props.subtitle}</p>
              </div>

              {props.children}
            </div>
          </section>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
        <div className="mx-auto max-w-[20%]">
          © <span aria-hidden="true">2025</span> NOMAD. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
