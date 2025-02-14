import AuthLayout from '@/components/auth/layout';
import './globals.css';
import AppContextProvider from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
export const metadata = {
  title: 'Inferno boutique',
  description:
    'inferno botique is a world wide cloth selling website based in kenya.',
  icons: {
    icon: 'logo.png',
  },
};

export default function AppLayout({ children }) {
  return (
    <html>
      <body>
        <main className='h-screen w-screen overflow-auto relative'>
          <div className=' flex flex-col items-center'>
            <div className=' w-full max-w-[1500px] px-1 '>
              <ClerkProvider>
                <AppContextProvider>
                  {children}
                  <AuthLayout />
                </AppContextProvider>
              </ClerkProvider>
              <Toaster />
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
