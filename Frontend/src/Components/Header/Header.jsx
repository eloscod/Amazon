import React, { useContext } from "react"; // Imports React and useContext hook
import { Link } from "react-router-dom"; // Link component for client-side routing
import amazonLogo from "../../assets/Images/amazon_logo.png"; // Amazon logo image
import usaFlag from "../../assets/Images/usa_flag.png"; // USA flag image
import classes from "./Header.module.css"; // CSS module for styling
import { SlLocationPin } from "react-icons/sl"; // Location pin icon (react-icons)
import { IoIosSearch } from "react-icons/io"; // Search icon (react-icons)
import { BiCart } from "react-icons/bi"; // Cart icon (react-icons)
import LowerHeader from "./LowerHeader"; // Secondary header/navigation component
import { DataContext } from "../DataProvider/DataProvider"; // Global data/context
import { auth } from "../../Utility/firebase"; // Firebase authentication instance

function Header() {
  // Destructure user and basket from global context
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate total items in the cart
  const totalItemOnCart = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    // Outer container with fixed positioning (based on CSS module)
    <div className={classes.fixed}>
      {/* Main header section */}
      <header className={classes.header}>
        <div className={classes.headerContainer}>
          {/* Logo & Delivery Info */}
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

          {/* Search Bar */}
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

          {/* Navigation (Language, Account, Orders, Cart) */}
          <div className={classes.navContainer}>
            {/* Language Selector */}
            <div className={classes.languageSelector}>
              <img src={usaFlag} alt="USA Flag" />
              <select className={classes.languageDropdown}>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Account & Lists (Sign In / Sign Out) */}
            <Link to={!user && "/auth"} className={classes.accountLink}>
              <div>
                <div>
                  {user ? (
                    <>
                      {/* Display user email prefix before '@' */}
                      <p>Hello, {user?.email?.split("@")[0]}</p>
                      {/* Sign out on click */}
                      <span onClick={() => auth.signOut()}>SignOut</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign In</p>
                    </>
                  )}
                </div>
                <span>Account &amp; Lists</span>
              </div>
            </Link>

            {/* Returns & Orders */}
            <Link to="/orders" className={classes.ordersLink}>
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            {/* Cart Icon & Item Count */}
            <Link to="/cart" className={classes.cartLink}>
              <BiCart className={classes.cartIcon} />
              <span className={classes.cartCount}>{totalItemOnCart}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Secondary/Lower Header */}
      <LowerHeader />
    </div>
  );
}

export default Header; // Exports the Header component as default
