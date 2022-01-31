import Head from 'next/head'

export default function Home() {
  return (
    <div className="bg-slate-800 flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-white text-6xl font-bold">
          Welcome 👋🏻{' '}
          <a className="text-green-400" href="https://nextjs.org">
            to my page!
          </a>
        </h1>

        <p className="mt-3 p-3 text-2xl text-white">
          My name is{' '}
          <code className="rounded-md bg-zinc-800 p-2 font-mono text-lg text-slate-400">
            Vlad
          </code>
        </p>
        <div>
        <button className="bg-green-300 text-white rounded-full font-bold p-3">Wave at Me</button>
        </div>
      </main>

      <footer className="text-gray-300 text-xs flex items-center justify-center w-full h-5 border-t">
          <h1>
            © {new Date().getFullYear()} Created by{' '}
            <a
              className="font-mono text-green-400"
              href="http://vladh.eth.link/"
              target="_blank"
              rel="noopener noreferrer"
            >
              vladh.eth
            </a>
          </h1>
        </footer>
    </div>
  )
}
