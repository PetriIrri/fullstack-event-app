/**
 * Component for showing footer at the bottom of the page.
 * @author Petri Irri
 * @component
 * @example
 * <Footer />
 */
function Footer(props) {
  return (
    <footer className="footer row mt-auto fixed-bottom py-3 bg-info">
      <div className="container col-sm-4 ">
        <p className="text-bold text-center">Tehnyt: Petri Irri</p>
      </div>
      <div className="container col-sm-4 ">
        <p className="text-bold text-center">petri.irri@gmail.com</p>
      </div>
      <div className="container col-sm-4 ">
        <p className="text-bold text-center">
          <a href="https://github.com/PetriIrri">
            https://github.com/PetriIrri
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
