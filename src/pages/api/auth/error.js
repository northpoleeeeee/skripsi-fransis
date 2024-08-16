export default function ErrorPage({ error }) {
    return (
      <div>
        <h1>Terjadi Kesalahan</h1>
        <p>{error}</p>
      </div>
    );
  }
  
  export async function getServerSideProps(context) {
    const error = context.query.error || 'Unknown error';
    return { props: { error } };
  }
  