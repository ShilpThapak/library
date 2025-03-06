import { useRouter } from 'next/router'
import SingleBookPage from '@/components/SingleBookPage'
import ClientOnly from "@/components/ClientOnly";
 
export default function Page() {
  const router = useRouter()
  const bookID = router.query.slug
  return (<>
      <p>Book ID: {router.query.slug}</p>

      <ClientOnly>
        <SingleBookPage bookID={bookID}/>
      </ClientOnly>
    </>
  )
  
  
}