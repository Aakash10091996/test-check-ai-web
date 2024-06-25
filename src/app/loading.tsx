export default function Loading({ otherClasses = "" }: { otherClasses?: string }) {
  return (
    <div>
      <div
        className={`mx-auto my-8 flex animate-spin rounded-full border-solid border-current border-r-transparent align-middle motion-reduce:animate-[spin_1.5s_linear_infinite] ${otherClasses ? otherClasses : "size-8 border-4"}`}
      />
    </div>
  );
}
