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
        <div className="text-lg font-medium">
          <span>Thống kê</span>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-4 py-4 mx-2 border border-gray-200 shadow-md md:mx-8 md:py-8 rounded-md space-y-4"
              >
                <div className="text-4xl font-medium text-primary-500">
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
