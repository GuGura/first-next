import {UnsplashImage} from "@/app/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import {Alert} from "@/app/components/bootstrap";


export const metadata = {
  title: 'Dynamic Fetching - NextJS 13.5 Image Gallery',
}

export const revalidate = 0
export default async function Page() {
  const response
    = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, {
    // cache: 'no-store',
    // cache: 'no-cache',
    // next: {revalidate:0}
  })
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width)
  const height = (width * image.height) / image.width

  return (
    <div className='d-flex flex-column align-items-center'>
      <Alert>
        This page <strong> fetches data dynamically</strong>.
        Every time you refresh the page, you get a new image from the API.
      </Alert>
      <Image alt='Random Unsplash Image'
             src={image.urls?.raw}
             width={width}
             height={height}
             className='rounded shadow mw-100 h-100'
      />
      by <Link href={'/users/' + image.user.username}>{image.user.username}</Link>
    </div>
  )
}