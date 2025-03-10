import React, { useContext } from "react";
import { Link } from "react-router-dom";
import amazonLogo from "../../assets/Images/amazon_logo.png";
import usaFlag from "../../assets/Images/usa_flag.png";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItemOnCart = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <div className={classes.fixed}>
      <header className={classes.header}>
        <div className={classes.headerContainer}>
          <div className={classes.logoContainer}>
            <Link to="/">
              <img src={amazonLogo} alt="Amazon Logo" />
            </Link>
            <div className={classes.delivery}>
              <SlLocationPin className={classes.locationIcon} />
              <div className={classes.deliveryText}>
                <p>Delivery to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.searchContainer}>
            <select className={classes.searchCategory}>
              <option value="all">All</option>
            </select>
            <input
              type="text"
              className={classes.searchInput}
              placeholder="Search Amazon"
            />
            <button className={classes.searchButton} type="submit">
              <IoIosSearch />
            </button>
          </div>
          <div className={classes.navContainer}>
            <div className={classes.languageSelector}>
              <img src={usaFlag} alt="USA Flag" />
              <select className={classes.languageDropdown}>
                <option value="en">EN</option>
              </select>
            </div>
            <Link to={!user && "/auth"} className={classes.accountLink}>
              <div>
                <div>
                  {user ? (
                    <>
                      <p>Hello, {user?.email?.split("@")[0]}</p>
                      <span onClick={() => auth.signOut()}>SignOut</span>
                    </>
                  ) : (
                    <>
                      <p> Hello, Sign In</p>
                    </>
                  )}
                </div>

                <span>Account &amp; Lists</span>
              </div>
            </Link>
            <Link to="/orders" className={classes.ordersLink}>
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>
            <Link to="/cart" className={classes.cartLink}>
              <BiCart className={classes.cartIcon} />
              <span className={classes.cartCount}>{totalItemOnCart}</span>
            </Link>
          </div>
        </div>
      </header>
      <LowerHeader />
    </div>
  );
}

export default Header;
