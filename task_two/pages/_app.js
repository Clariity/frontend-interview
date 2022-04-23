import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-light text-black flex flex-col">
      <div className="flex justify-center items-center p-4 min-h-screen">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
