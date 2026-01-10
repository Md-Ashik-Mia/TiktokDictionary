import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { api, userApi } from "@/lib/https";
import { cookies } from "next/headers";
import Link from "next/link";
import AddDefinition from "./components/AddDefinition";
import Dislike from "./components/Dislike";
import Like from "./components/Like";
import SyncAccessTokenCookie from "./components/SyncAccessTokenCookie";

type RelatedWord = {
  word_id: number;
  word: string;
};

type WordDefinition = {
  defination_id: number;
  defination: string;
  example_sentence: string | null;
  total_likes: number;
  total_dislikes: number;
  status: string;
};


async function getPost(slug: string) {
    // Simulate fetching post data based on slug/
    // console.log("local storage ", localStorage.getItem("accessToken"));
    console.log("Fetching data for slug:", slug);

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (token) {
      const data = await userApi.get(`dictionary/getword/${slug}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data || "No definition found.";
    } else {
      const data = await api.get(`dictionary/getword/${slug}/`);
      return data.data || "No definition found.";
    }

    // return data.data || "No definition found.";

}




export default async function TestWordPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  console.log("Post data:", post?.defination[0]?.defination);
  console.log("Post word:", post);


  return (
   <main className="min-h-screen flex flex-col bg-white text-[#0f2d5c]">
      <SyncAccessTokenCookie />
      {/* Hero */}
      <div className="relative">
        <div className="bg-[#e9f2ff] pb-80 pt-24 sm:pt-28">
          <Navbar />
        </div>
        <div className="absolute inset-x-0 top-[90%] bottom-0 bg-white" />

        <section className="relative max-w-6xl mx-auto px-6 -mt-24">
          <div className="bg-white rounded-3xl shadow-md shadow-[#00000026] p-6 md:p-8">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              {post.word}
            </h1>

            <p className="mt-3 text-base sm:text-lg text-[#00336E]">
              {post?.defination[0]?.defination}
            </p>

            <p className="mt-2 text-base sm:text-lg text-[#00336E]">
              Example: “{post?.defination[0]?.example_sentence}”
            </p>

            <div className="mt-4 flex items-center gap-5 text-[#00336E]">
              <div className="inline-flex items-center gap-1 text-2xl font-bold">
                <Like defId={post?.defination[0]?.defination_id} status={post?.defination[0]?.status} /> {post.total_likes}
              </div>
              <div className="inline-flex items-center gap-1 text-2xl font-bold">
                <Dislike defId={post?.defination[0]?.defination_id} status={post?.defination[0]?.status} /> {post.total_dislikes}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Alternate Definitions */}
        <div className="bg-white border-t border-gray-100 rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Alternate Definitions
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {((post?.defination ?? []) as WordDefinition[]).map((def) => (
              <div
                key={def.defination_id}
                className="rounded-xl bg-[#00336E0D] py-8 px-4 flex flex-col justify-between"
              >
                <p className="text-base sm:text-lg text-[#123a7a] leading-relaxed">
                  “{def.defination}”
                </p>

                <div className="mt-3 flex items-center gap-4 text-[#0f2d5c]">
                  <span className="text-2xl font-bold flex justify-center items-center"><Like defId={def.defination_id} status={def.status} /> {def.total_likes}</span>
                  <span className="text-2xl font-bold flex justify-center items-center"><Dislike defId={def.defination_id} status={def.status} /> {def.total_dislikes}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Meaning */}
          <AddDefinition wordId={post?.word_id} />
        </div>

        {/* Related Words */}
        <div className="bg-white border-t border-gray-100 rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Related Words
          </h2>

          <div className="flex flex-wrap gap-4">
            {((post?.related_word ?? []) as RelatedWord[]).map((rw) => (
              <Link
                key={rw.word_id}
                href={`/word/${rw.word_id}`}
                className="px-4 py-4 w-full sm:w-[48%] md:w-1/4 rounded-xl bg-[#f3f7ff] text-base text-[#0f2d5c] hover:bg-[#e9f2ff] transition"
              >
                {rw.word}
              </Link>
            ))}
          </div>
        </div>

        {/* Word Origin */}
        <div className="bg-white border-t border-gray-100 rounded-3xl shadow-xl p-6 md:p-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Word Origin / First Use
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#00336E0D] rounded-xl p-4">
              <div className="text-base text-[#00336E] mb-1">
                Submitted originally by:
              </div>
              <div className="font-bold text-xl text-[#00336E]">
                {post?.submitted_by ?? "Not available"}
              </div>
            </div>

            <div className="bg-[#00336E0D] rounded-xl p-4">
              <div className="text-base text-[#00336E] mb-1">
                Date first submitted:
              </div>
              <div className="font-bold text-xl text-[#00336E]">
                {post?.submitted_date
                  ? new Date(post.submitted_date).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not available"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubmitCTA />
      <Footer />
    </main>
  )
}
