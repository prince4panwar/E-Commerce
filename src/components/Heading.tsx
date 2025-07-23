import { useThemeHook } from "../GlobalComponents/ThemeProvider";

interface HeadingProps {
  heading: string;
  size?: string;
}

function Heading(props: HeadingProps) {
  const [theme] = useThemeHook();

  return (
    <h1
      className={`text-center border-bottom py-2 ${props?.size} ${
        theme ? "text-dark-primary" : "text-light-primary"
      }`}
    >
      {props.heading}
    </h1>
  );
}

export default Heading;
