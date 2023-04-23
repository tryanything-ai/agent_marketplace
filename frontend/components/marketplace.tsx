import Search from "./search";

const Marketplace = () => {
  return (
    // <Container>
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold pb-5">
            <span className="">Do</span>{" "}
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600">
              Anything
            </span>
          </h1>
          <Search className="w-full" mobile={false} />
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
    // </Container>
  );
};

export default Marketplace;
