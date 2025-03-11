import { useRouter } from 'next/router'
import SingleAuthorPage from '@/components/authors/SingleAuthorPage'
import ClientOnly from "@/components/common/ClientOnly";

export default function Page() {
    const router = useRouter()
    const authorId = router.query.slug
    return (<>
        <ClientOnly>
            <SingleAuthorPage authorId={authorId} />
        </ClientOnly>
    </>
    )


}