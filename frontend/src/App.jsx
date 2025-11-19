import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ScreenEnum } from "../src/types/navigation";

import { Onboarding } from "./components/Onboarding";
import Auth from "./components/Auth";

// 🔥 IMPORTANT: Rename the import to avoid conflict
import { Home as HomeScreen } from "../src/components/MainHome";

import { Explore } from "./components/Explore";
import { ProductDetails } from "./components/ProductDetails";
import { RentalRequest } from "./components/RentalRequest";
import { Payment } from "./components/Payment";
import { Chat } from "./components/Chat";
import { MeetUp } from "./components/MeetUp";
import { Wallet } from "./components/Wallet";
import AddListing from "./components/AddListing";
import { MyListings } from "./components/MyListings";
import { MyRentals } from "./components/MyRentals";
import { Notifications } from "./components/Notifications";
import { Profile } from "./components/Profile";
import { RateReview } from "./components/RateReview";
import { BottomNav } from "./components/BottomNav";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(ScreenEnum.ONBOARDING);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ ADDED — Storage for listings created from AddListing
  const [listings, setListings] = useState([]);

  const navigate = (screen, product, rental) => {
    setCurrentScreen(screen);
    if (product) setSelectedProduct(product);
    if (rental) setSelectedRental(rental);
  };

  const renderScreen = () => {
    // If user is NOT authenticated → always show Auth
    if (
      !isAuthenticated &&
      currentScreen !== ScreenEnum.ONBOARDING &&
      currentScreen !== ScreenEnum.AUTH
    ) {
      return (
        <Auth
          onAuthSuccess={() => {
            setIsAuthenticated(true);
            navigate(ScreenEnum.HOME);
          }}
          onNavigate={navigate}
        />
      );
    }

    switch (currentScreen) {
      case ScreenEnum.ONBOARDING:
        return <Onboarding onNavigate={navigate} />;

      case ScreenEnum.AUTH:
        return (
          <Auth
            onAuthSuccess={() => {
              setIsAuthenticated(true);
              navigate(ScreenEnum.HOME);
            }}
            onNavigate={navigate}
          />
        );

      case ScreenEnum.HOME:
        return <HomeScreen onNavigate={navigate} />; // ✅ FIXED

      case ScreenEnum.EXPLORE:
        return <Explore onNavigate={navigate} />;

      case ScreenEnum.PRODUCT:
        return selectedProduct ? (
          <ProductDetails product={selectedProduct} onNavigate={navigate} />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case ScreenEnum.RENTAL_REQUEST:
        return selectedProduct ? (
          <RentalRequest product={selectedProduct} onNavigate={navigate} />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case ScreenEnum.PAYMENT:
        return selectedProduct ? (
          <Payment product={selectedProduct} onNavigate={navigate} />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case ScreenEnum.CHAT:
        return selectedRental ? (
          <Chat rental={selectedRental} onNavigate={navigate} />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case ScreenEnum.MEETUP:
        return selectedRental ? (
          <MeetUp rental={selectedRental} onNavigate={navigate} />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case ScreenEnum.WALLET:
        return <Wallet onNavigate={navigate} />;

      case ScreenEnum.ADD_LISTING:
        return (
          <AddListing
            onNavigate={navigate}
            onSaveListing={(listing) =>
              setListings((prev) => [...prev, listing])
            }
          />
        );

      case ScreenEnum.MY_LISTINGS:
        return <MyListings listings={listings} onNavigate={navigate} />;

      case ScreenEnum.MY_RENTALS:
        return <MyRentals onNavigate={navigate} />;

      case ScreenEnum.NOTIFICATIONS:
        return <Notifications onNavigate={navigate} />;

      case ScreenEnum.PROFILE:
        return <Profile onNavigate={navigate} />;

      case ScreenEnum.RATE_REVIEW:
        return selectedRental ? (
          <RateReview rental={selectedRental} onNavigate={navigate} />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  const showBottomNav =
    isAuthenticated &&
    ![
      ScreenEnum.ONBOARDING,
      ScreenEnum.AUTH,
      ScreenEnum.PRODUCT,
      ScreenEnum.RENTAL_REQUEST,
      ScreenEnum.PAYMENT,
      ScreenEnum.CHAT,
      ScreenEnum.MEETUP,
      ScreenEnum.ADD_LISTING,
      ScreenEnum.RATE_REVIEW,
    ].includes(currentScreen);

  return (
    <View style={styles.root}>
      <View style={styles.appContainer}>
        <View style={styles.screenWrapper}>{renderScreen()}</View>
        {showBottomNav && (
          <BottomNav currentScreen={currentScreen} onNavigate={navigate} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  appContainer: {
    width: "100%",
    maxWidth: 430,
    height: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  screenWrapper: {
    flex: 1,
  },
});
