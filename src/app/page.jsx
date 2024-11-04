import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="h-dvh w-full bg-black/[0.85]">
        <div className="container mx-auto text-center">
          <h1 className="text-white text-4xl font-bold pt-32 pb-4">Learning Mangement System</h1>
          <p className="px-32 text-gray-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos quibusdam provident expedita rem quas deleniti ducimus tempore. Praesentium ducimus tempore obcaecati est perferendis dicta, accusamus explicabo soluta eligendi modi maxime?</p>
        </div>
      </section>
    </>
  );
}
