interface DateParser {
  day: number
  month: number
  year: string
}

export const useDate = () => {
  const dateParser = (date: Date): DateParser => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(2);

    return {
      day,
      month,
      year,
    };
  };

  const formatDatepicker = (date: Date): string => {
    const {
      day,
      month,
      year,
    } = dateParser(date);

    return `${day}.${month}.${year}`;
  };

  return {
    dateParser,
    formatDatepicker,
  };
};
