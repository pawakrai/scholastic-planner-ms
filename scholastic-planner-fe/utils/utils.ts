export const mapDate = (date: string) => {
  switch (date) {
    case "Mon":
      return "จันทร์";
    case "Tue":
      return "อังคาร";
    case "Wed":
      return "พุธ";
    case "Thu":
      return "พฤหัสบดี";
    case "Fri":
      return "ศุกร์";
    case "Sat":
      return "เสาร์";
    case "Sun":
      return "อาทิตย์";
    default:
      return date;
  }
};
