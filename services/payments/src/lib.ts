import { add, format, money } from "@demo/money";
  export const captured = () => format(add(money(1649), money(0)));
