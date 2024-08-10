import PropertyListItem from "./PropertyListItem";

const PropertyList = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <PropertyListItem
        image_path="/properties/beach_1.jpg"
        name="Beach house"
      />
      <PropertyListItem
        image_path="/properties/image2.jpeg"
        name="Barbie house"
      />
      <PropertyListItem image_path="/properties/image3.jpeg" name="Ted house" />
      <PropertyListItem
        image_path="/properties/image4.jpeg"
        name="Mansion house"
      />
      <PropertyListItem
        image_path="/properties/image5.png"
        name="Ferrari house"
      />
      <PropertyListItem
        image_path="/properties/image6.jpeg"
        name="Olympic house"
      />
    </div>
  );
};

export default PropertyList;
