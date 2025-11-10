import "./../style/Footer.css";
import { Link } from "react-router-dom";
import instagram from "../photoSelfcare/instagram.png";
import facebook from "../photoSelfcare/facebook.png";

export default function Footer() {
    return(
        <footer className="footer">
            <div className="footer-left">
                <h4>About</h4>
                <p>
                    where he in the
                    beginning baked from home, and quickly opened in a small basement and
                    after only 1 year grew out of space and opened a 500 kvm cafe and
                    professional bakery and coffee brand and 20+ employees.
                </p>
                <div>
                    <a
                    href="https://www.instagram.com/davidbreadhead/?hl=da"
                    className="instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img src={instagram} alt="Instagram" className="instagram-photo" />
                    </a>

                    <a
                    href="https://www.facebook.com/DavidBreadHead"
                    className="facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img src={facebook} alt="Facebook" className="facebook-photo" />
                    </a>
                </div>

            </div>
            <div className="footer-right">
                <h4>Contact</h4>
                <Link to="/location">Location</Link>
                <Link to="/events">Events</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/jobs">Jobs</Link>
            </div>

        </footer>
    )
}