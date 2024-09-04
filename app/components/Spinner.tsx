import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
  borderWidth: "5px",
};

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <ClipLoader
      color="#ff385c"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
