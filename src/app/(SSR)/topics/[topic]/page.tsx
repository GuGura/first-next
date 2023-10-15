import {UnsplashImage} from "@/app/models/unsplash-image";
import Image from "next/image";
import styles from './TopicPage.module.css'
import {Metadata} from "next";

interface PageProps {
  params: { topic: string },
  // searchParams: {[key: string]: string | string[] | undefined}
}

export function generateMetadata({params: {topic}}: PageProps):Metadata {
  return {
    title: topic + ' - NextJS 13.5 Image Gallery',
  }
}

export function generateStaticParams() {
  return ['health', 'fitness', 'coding'].map(topic => ({topic}))
}


export default async function Page({params: {topic}}: PageProps) {

  const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
  const images: UnsplashImage[] = await response.json();


  return (
    <div>
      <h1>Topic: {topic}</h1>
      {images.map((image, i) =>
        <Image src={image.urls.raw}
               className={styles.image}
               key={image.urls.raw}
               width={250}
               height={250}
               alt='Image List'/>
      )}
    </div>
  )
}