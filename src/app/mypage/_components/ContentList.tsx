import type { PostType } from "@/lib/types/post"
import Image from "next/image"

type ContentGridProps = {
  title: string
  subtitle: string
  posts: PostType[]
}

const ContentList = ({ title, subtitle, posts }: ContentGridProps) => {
  return (
    <section className="my-12">
      <div className="mb-4">
        <p className="text-body text-gray-600">{subtitle}</p>
        <h2 className="text-title1 font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden justify-items-center content-center">
            <Image
              src={post.thumbnail || "/placeholder.svg?height=400&width=400"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <button className="aspect-square flex items-center justify-center">
          더보기
        </button>
      </div>
    </section>
  )
}

export default ContentList