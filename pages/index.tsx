import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './utils/WavePortal.json';
declare var window: any

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const contractAddress = "0xD95C875d3A78bEbDBE18f3Bb380F820b72b4e3a5";
  const contractABI = abi.abi;
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have 🦊 metamask!");
        return;
      } else {
        console.log("✅ We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //ENS names integration
      // const provider = getDefaultProvider()
      // var ensName = await provider.lookupAddress(accounts);
      // const address = await provider.getAvatar("vladh.eth")
      // console.log('this is an ens name', ensName)

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("✅ Found an authorized account:", accounts);
        setCurrentAccount(account)
      } else {
        console.log("❌ No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get 🦊 MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected ✅", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
  
  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total 🌊 wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave("This is a message");
        console.log("⛏️ Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("⚒️ Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total 👋 wave count...", count.toNumber());
      } else {
        console.log("❌ Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();


        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });
        console.log(waves)
        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="bg-slate-800 flex min-h-screen flex-col items-center justify-center py-2">
      <nav className='w-screen flex justify-end'>
          {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <div className='pr-10'>
          <button onClick={connectWallet} className="bg-slate-800 text-green-400 rounded-full font-bold mt-5 p-4 drop-shadow-md">🔌 Connect Wallet</button>
          </div>
        )}
        </nav>
      <Head>
        <title>Welcome to Web3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
        <h1 className="text-white text-6xl font-bold">
          Welcome 👋🏻{' '}
          <a className="text-green-400">
            to my page!
          </a>
        </h1>
        </div>
        <div className="mt-3 p-3 text-2xl text-white">
        <p >
          My name is{' '}
          <code className="rounded-md bg-zinc-800 p-1 font-mono text-lg text-green-400">
            Vlad.
          </code>
        </p>
        <p>I'm learning about Web3,</p>
          <div className='flex flex-row p-2 justify-center pt-5'>
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 mr-2 fill-gray-300"
                    viewBox="0 0 50 50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M 32.046875 2.9726562 A 1.0001 1.0001 0 0 0 31.785156 3 L 18.148438 3 A 1.0001 1.0001 0 0 0 17.949219 2.9882812 A 1.0001 1.0001 0 0 0 17.064453 3.6191406 L 10.212891 15.365234 A 1.0001 1.0001 0 0 0 10.210938 15.367188 A 1.0001 1.0001 0 0 0 10.208984 16.628906 L 17.136719 28.503906 A 1.0001 1.0001 0 0 0 18.863281 28.503906 L 25.574219 17 L 39 17 A 1.0001 1.0001 0 0 0 39.863281 15.496094 L 32.972656 3.6835938 A 1.0001 1.0001 0 0 0 32.046875 2.9726562 z M 19.740234 5 L 30.259766 5 L 25 14.015625 L 19.740234 5 z M 18 5.984375 L 23.259766 15 L 12.742188 15 L 18 5.984375 z M 32 5.984375 L 37.259766 15 L 26.740234 15 L 32 5.984375 z M 12.742188 17 L 23.259766 17 L 18 26.015625 L 12.742188 17 z M 31.943359 21.001953 A 1.0001 1.0001 0 0 0 31.136719 21.496094 L 24.425781 33 L 11 33 A 1.0001 1.0001 0 0 0 10.136719 34.503906 L 17.027344 46.316406 A 1.0001 1.0001 0 0 0 18.214844 47 L 31.789062 47 A 1.0001 1.0001 0 0 0 32.970703 46.318359 L 39.787109 34.634766 L 39.789062 34.632812 A 1.0001 1.0001 0 0 0 39.791016 33.371094 L 32.863281 21.496094 A 1.0001 1.0001 0 0 0 31.943359 21.001953 z M 32 23.984375 L 37.257812 33 L 26.740234 33 L 32 23.984375 z M 12.740234 35 L 23.259766 35 L 18 44.015625 L 12.740234 35 z M 26.740234 35 L 37.257812 35 L 32 44.015625 L 26.740234 35 z M 25 35.984375 L 30.259766 45 L 19.740234 45 L 25 35.984375 z"
                    />
                  </svg>
          <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 mr-2 fill-blue-400"
                    viewBox="0 0 50 50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M 25.984375 0.98632812 A 1.0001 1.0001 0 0 0 25.099609 1.5527344 L 11.169922 23.443359 A 1.0009551 1.0009551 0 0 0 11.107422 23.548828 A 1.0009551 1.0009551 0 0 0 11.105469 23.550781 A 1.0001 1.0001 0 0 0 11.066406 23.640625 A 1.0009551 1.0009551 0 0 0 11.013672 23.833984 A 1.0001 1.0001 0 0 0 11 24.033203 A 1.0009551 1.0009551 0 0 0 11 24.035156 A 1.0001 1.0001 0 0 0 11.007812 24.132812 A 1.0009551 1.0009551 0 0 0 11.011719 24.152344 A 1.0001 1.0001 0 0 0 11.046875 24.298828 A 1.0001 1.0001 0 0 0 11.054688 24.326172 A 1.0009551 1.0009551 0 0 0 11.054688 24.328125 A 1.0001 1.0001 0 0 0 11.091797 24.419922 A 1.0009551 1.0009551 0 0 0 11.091797 24.421875 A 1.0001 1.0001 0 0 0 11.138672 24.507812 A 1.0009551 1.0009551 0 0 0 11.138672 24.509766 A 1.0001 1.0001 0 0 0 11.193359 24.591797 A 1.0009551 1.0009551 0 0 0 11.222656 24.626953 A 1.0001 1.0001 0 0 0 11.257812 24.669922 A 1.0001 1.0001 0 0 0 11.326172 24.740234 A 1.0009551 1.0009551 0 0 0 11.328125 24.742188 A 1.0009551 1.0009551 0 0 0 11.486328 24.859375 A 1.0009551 1.0009551 0 0 0 11.488281 24.861328 A 1.0001 1.0001 0 0 0 11.503906 24.869141 A 1.0009551 1.0009551 0 0 0 11.505859 24.871094 L 25.378906 32.798828 A 1.0001 1.0001 0 0 0 26.613281 32.802734 L 40.474609 24.880859 A 1.0009551 1.0009551 0 0 0 40.496094 24.869141 A 1.0001 1.0001 0 0 0 40.560547 24.828125 A 1.0009551 1.0009551 0 0 0 40.580078 24.814453 A 1.0001 1.0001 0 0 0 40.59375 24.802734 A 1.0009551 1.0009551 0 0 0 40.654297 24.757812 A 1.0009551 1.0009551 0 0 0 40.658203 24.753906 A 1.0001 1.0001 0 0 0 40.669922 24.744141 A 1.0009551 1.0009551 0 0 0 40.730469 24.683594 A 1.0009551 1.0009551 0 0 0 40.794922 24.607422 A 1.0009551 1.0009551 0 0 0 40.849609 24.527344 A 1.0009551 1.0009551 0 0 0 40.851562 24.525391 A 1.0001 1.0001 0 0 0 40.853516 24.519531 A 1.0009551 1.0009551 0 0 0 40.900391 24.439453 A 1.0009551 1.0009551 0 0 0 40.900391 24.4375 A 1.0001 1.0001 0 0 0 40.931641 24.367188 A 1.0009551 1.0009551 0 0 0 40.939453 24.345703 A 1.0001 1.0001 0 0 0 40.947266 24.322266 A 1.0009551 1.0009551 0 0 0 40.966797 24.253906 A 1.0009551 1.0009551 0 0 0 40.96875 24.25 A 1.0001 1.0001 0 0 0 40.970703 24.244141 A 1.0009551 1.0009551 0 0 0 40.988281 24.152344 A 1.0001 1.0001 0 0 0 40.998047 24.076172 A 1.0009551 1.0009551 0 0 0 40.998047 24.068359 A 1.0001 1.0001 0 0 0 41 23.976562 A 1.0001 1.0001 0 0 0 40.996094 23.917969 A 1.0009551 1.0009551 0 0 0 40.990234 23.855469 A 1.0009551 1.0009551 0 0 0 40.990234 23.853516 A 1.0001 1.0001 0 0 0 40.988281 23.84375 A 1.0009551 1.0009551 0 0 0 40.970703 23.759766 A 1.0009551 1.0009551 0 0 0 40.970703 23.755859 A 1.0001 1.0001 0 0 0 40.949219 23.681641 A 1.0009551 1.0009551 0 0 0 40.941406 23.660156 A 1.0001 1.0001 0 0 0 40.931641 23.636719 A 1.0009551 1.0009551 0 0 0 40.904297 23.570312 A 1.0009551 1.0009551 0 0 0 40.902344 23.568359 A 1.0001 1.0001 0 0 0 40.900391 23.5625 A 1.0009551 1.0009551 0 0 0 40.853516 23.480469 A 1.0001 1.0001 0 0 0 40.847656 23.470703 A 1.0009551 1.0009551 0 0 0 40.84375 23.462891 L 40.8125 23.416016 L 26.896484 1.546875 A 1.0001 1.0001 0 0 0 25.984375 0.98632812 z M 25 5.4355469 L 25 17.339844 L 14.583984 21.802734 L 25 5.4355469 z M 27 5.4355469 L 37.416016 21.802734 L 27 17.339844 L 27 5.4355469 z M 25 19.515625 L 25 30.275391 L 14.242188 24.128906 L 25 19.515625 z M 27 19.515625 L 37.757812 24.128906 L 27 30.275391 L 27 19.515625 z M 40.007812 27.998047 A 1.0001 1.0001 0 0 0 39.503906 28.130859 L 26 35.847656 L 12.496094 28.130859 A 1.0001 1.0001 0 0 0 12.019531 28 A 1.0001 1.0001 0 0 0 11.195312 29.59375 L 25.128906 48.503906 A 1.0001 1.0001 0 0 0 26.869141 48.505859 L 40.804688 29.59375 A 1.0001 1.0001 0 0 0 40.007812 27.998047 z M 15.613281 32.216797 L 25 37.582031 L 25 44.957031 L 15.613281 32.216797 z M 36.386719 32.216797 L 27 44.957031 L 27 37.582031 L 36.386719 32.216797 z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 mr-2 fill-gray-500"
                    viewBox="0 0 100 100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M29.4 45.7333H26.1333V52.2667H29.4V45.7333ZM68.6 52.2667H71.8667V45.7333H68.6V52.2667ZM29.4 26.1333H26.1333V32.6667H29.4V26.1333ZM42.4667 32.6667H45.7333V26.1333H42.4667V32.6667ZM68.6 3.26667L70.9128 0.953867L69.9524 0H68.6V3.26667ZM88.2 22.8667H91.4667V21.5143L90.5128 20.5539L88.2 22.8667V22.8667ZM52.2667 71.8667L49.9539 74.1795L52.2667 71.8667ZM49 75.1333L50.4635 78.0537L50.7248 77.9231L50.96 77.7467L49 75.1333ZM29.4 52.2667H68.6V45.7333H29.4V52.2667ZM29.4 32.6667H42.4667V26.1333H29.4V32.6667ZM81.6667 91.4667H16.3333V98H81.6667V91.4667ZM13.0667 88.2V9.8H6.53333V88.2H13.0667ZM16.3333 6.53333H68.6V0H16.3333V6.53333ZM84.9333 22.8667V88.2H91.4667V22.8667H84.9333ZM66.2872 5.57947L85.8872 25.1795L90.5128 20.5539L70.9128 0.953867L66.2872 5.57947V5.57947ZM16.3333 91.4667C15.467 91.4667 14.6361 91.1225 14.0235 90.5099C13.4108 89.8973 13.0667 89.0664 13.0667 88.2H6.53333C6.53333 90.7991 7.56583 93.2918 9.40369 95.1296C11.2415 96.9675 13.7342 98 16.3333 98V91.4667ZM81.6667 98C84.2658 98 86.7585 96.9675 88.5963 95.1296C90.4342 93.2918 91.4667 90.7991 91.4667 88.2H84.9333C84.9333 89.0664 84.5892 89.8973 83.9766 90.5099C83.3639 91.1225 82.533 91.4667 81.6667 91.4667V98ZM13.0667 9.8C13.0667 8.93363 13.4108 8.10274 14.0235 7.49012C14.6361 6.8775 15.467 6.53333 16.3333 6.53333V0C13.7342 0 11.2415 1.0325 9.40369 2.87035C7.56583 4.70821 6.53333 7.20088 6.53333 9.8H13.0667ZM35.7635 76.1656C36.4887 73.99 38.5532 71.9712 41.1861 71.2656C43.6492 70.6057 46.8179 71.0369 49.9539 74.1795L54.5795 69.5539C49.8755 64.8499 44.3287 63.6543 39.494 64.9544C34.8357 66.2088 31.0203 69.7433 29.5633 74.1011L35.77 76.1656H35.7635ZM49.9539 74.1795C50.1377 74.3579 50.3101 74.5477 50.47 74.7479L55.6313 70.7364C55.3054 70.323 54.9541 69.9302 54.5795 69.5604L49.9539 74.1795ZM50.47 74.7479C50.9796 75.4012 50.862 75.6103 50.8816 75.4665C50.8947 75.3751 50.9208 75.5253 50.5288 75.8781C49.964 76.3503 49.3234 76.7236 48.6341 76.9823C47.806 77.3154 46.9423 77.5522 46.06 77.6879C45.5218 77.7903 44.9713 77.8123 44.4267 77.7532C44.3156 77.7271 44.5443 77.7532 44.884 77.9949C45.3006 78.3164 45.6068 78.7596 45.7602 79.263C45.9136 79.7664 45.9065 80.3051 45.7399 80.8043C45.7028 80.9125 45.6524 81.0157 45.5896 81.1113C45.5765 81.1244 45.6876 80.9807 46.06 80.6736C46.8048 80.0725 48.1768 79.1971 50.4635 78.0603L47.5365 72.2129C45.0735 73.4412 43.2245 74.5649 41.9571 75.5907C41.3143 76.0923 40.7428 76.6792 40.2584 77.3351C39.6423 78.1599 39.3202 79.1674 39.3437 80.1967C39.4091 81.6079 40.1735 82.6467 41.0097 83.2543C41.748 83.8031 42.5647 84.0383 43.1657 84.1624C44.3875 84.4041 45.7791 84.3388 47.04 84.1493C49.5227 83.7704 52.7371 82.6989 54.9257 80.7128C56.0625 79.674 57.1405 78.1844 57.3692 76.2309C57.6044 74.2317 56.8857 72.3567 55.6248 70.7429L50.4635 74.7479H50.47ZM50.96 77.7467C52.0053 76.9473 53.1412 76.2741 54.3443 75.7409L51.7505 69.7433C50.1825 70.4228 48.6145 71.344 47.04 72.52L50.96 77.7467V77.7467ZM54.3443 75.7409C58.5909 73.9051 62.3868 74.872 66.2741 76.7209C67.2541 77.1913 68.208 77.7009 69.1749 78.2236C70.1157 78.7332 71.1088 79.2755 72.0496 79.7589C73.8528 80.6671 76.0872 81.6667 78.4 81.6667V75.1333C77.7859 75.1333 76.7797 74.8263 75.0027 73.9312C74.1664 73.5 73.2909 73.0165 72.2848 72.4743C71.3048 71.9451 70.2203 71.3636 69.0835 70.8279C64.5232 68.6523 58.5583 66.8033 51.7505 69.7433L54.3443 75.7409V75.7409Z"
                    />
                  </svg>
                  </div>
        </div>
        <div>
        <div>
            <button className="bg-slate-800 text-green-400 rounded-full font-bold mt-10 p-3 drop-shadow-md"
            onClick={wave}>👋🏻 Wave at Me</button>
          <p className='pt-3 font-light text-xs text-gray-600' >Connect your Ethereum wallet to wave at me!</p>
          </div>
          <div>
            {allWaves.map((wave, index) => {
          return (
            <div key={index} 
            className="bg-yellow-100 text-white p-2">
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
          </div>
        </div>
      </main>

      <footer className="text-gray-300 text-xs flex items-center justify-center w-full h-5">
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
