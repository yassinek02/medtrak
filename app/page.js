import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]/route'
import User from 'components/User'
import Navbar from 'components/Navbar'
import Sidebar from 'components/Sidebar'
import FileUploader from 'components/FileUploader'
import FileUpload from 'components/FileUpload'


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <Navbar />
      <section className="grid grid-cols-11">
        <div className="col-span-1 bg-gray-200">
          <Sidebar />
        </div>

      <div className="col-span-5 border-neutral-800 p-2 mt-16 ml-32">
        <FileUpload />
        <FileUploader />
        <h1>Rendu côté serveur</h1>
        <pre>{JSON.stringify(session)}</pre>
        <h1>Rendu côté client</h1>
        <User />
      </div>
      </section>
    </section>
  );
}


