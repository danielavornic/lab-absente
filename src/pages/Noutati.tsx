import { Layout } from "components";

export const Noutati = () => {
  return (
    <Layout title="Noutăți">
      <iframe
        style={{
          width: "100%",
          height: "800px",
        }}
        src="https://utm.md/json/redj.php"
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
    </Layout>
  );
};
