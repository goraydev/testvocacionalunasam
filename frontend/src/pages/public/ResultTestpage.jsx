import useApp from "../../store/store";

export const ResultTestPage = () => {
  const maxSection = useApp((state) => state.maxSection);
  const { section, sum } = maxSection;

  return (
    <div>
      <p className="text-2xl text-black">El resultado es {sum} </p>
    </div>
  );
};
