interface IData {
  value: string;
  title: string;
}

type IProps = {
  data: IData[];
};

export const Statistic: React.FC<IProps> = ({ data }) => {
  return (
    <>
      <div className="space-y-4">
        <div className="font-medium text-lg">
          <span>Thống kê</span>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center md:mx-8 mx-2 px-4 md:py-8 py-4 rounded-md shadow-md border border-gray-200 space-y-4"
              >
                <div className="font-medium text-4xl text-primary-500">
                  <span>{item.value}</span>
                </div>

                <div className=" text-lg text-center">
                  <span>{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
