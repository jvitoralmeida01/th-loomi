import MapPinIcon from "../../../../assets/icons/map_pin.svg";
import HospitalIcon from "@/assets/icons/hospital.svg";
import PlaneIcon from "@/assets/icons/plane.svg";
import GraduationCapIcon from "@/assets/icons/graduation_cap.svg";
import LandmarkIcon from "@/assets/icons/landmark.svg";
import FilmIcon from "@/assets/icons/film.svg";
import DumbellIcon from "@/assets/icons/dumbell.svg";
import TreeIcon from "@/assets/icons/tree.svg";
import UtensilsIcon from "@/assets/icons/utensils.svg";
import StoreIcon from "@/assets/icons/store.svg";

export default function getMarkerIcon(icon: string): string {
  switch (icon) {
    case "hospital":
      return HospitalIcon.src;
    case "plane":
      return PlaneIcon.src;
    case "graduation-cap":
      return GraduationCapIcon.src;
    case "landmark":
      return LandmarkIcon.src;
    case "film":
      return FilmIcon.src;
    case "dumbell":
      return DumbellIcon.src;
    case "tree":
      return TreeIcon.src;
    case "utensils":
      return UtensilsIcon.src;
    case "store":
      return StoreIcon.src;
    default:
      return MapPinIcon.src;
  }
}
