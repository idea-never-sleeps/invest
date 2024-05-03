export default async function SubmitPage() {
  const now = new Date();
  const subend = new Date('May 4, 2024 10:45:00 GMT+0900');

  const submissionDone = now > subend;

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-4xl font-bold">not yet!</div>
    </div>
  );
}
