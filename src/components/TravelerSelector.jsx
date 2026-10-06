import { useState, useRef, useEffect } from "react";

export function TravelerSelector({ hasRooms = false, defaultValue = "1 Adult", onApply }) {
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState(defaultValue);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const calculateSummary = (roomData) => {
    let summaryText = "";
    if (hasRooms) {
      summaryText = `${roomData.length} Room${roomData.length > 1 ? "s" : ""}, `;
    }
    const totalAdults = roomData.reduce((sum, r) => sum + r.adults, 0);
    const totalChildren = roomData.reduce((sum, r) => sum + r.children, 0);
    summaryText += `${totalAdults} Adult${totalAdults > 1 ? "s" : ""}`;
    if (totalChildren > 0) {
      summaryText += `, ${totalChildren} Child${totalChildren > 1 ? "ren" : ""}`;
    }
    return summaryText;
  };

  const handleIncrement = (roomIndex, type) => {
    setRooms((prevRooms) => {
      const newRooms = [...prevRooms];
      if (type === "adults") {
        newRooms[roomIndex].adults += 1;
      } else {
        newRooms[roomIndex].children += 1;
      }
      return newRooms;
    });
  };

  const handleDecrement = (roomIndex, type) => {
    setRooms((prevRooms) => {
      const newRooms = [...prevRooms];
      if (type === "adults") {
        newRooms[roomIndex].adults = Math.max(1, newRooms[roomIndex].adults - 1);
      } else {
        newRooms[roomIndex].children = Math.max(0, newRooms[roomIndex].children - 1);
      }
      return newRooms;
    });
  };

  const handleAddRoom = () => {
    setRooms((prevRooms) => [...prevRooms, { adults: 1, children: 0 }]);
  };

  const handleRemoveRoom = (index) => {
    setRooms((prevRooms) => {
      if (prevRooms.length > 1) {
        return prevRooms.filter((_, i) => i !== index);
      }
      return prevRooms;
    });
  };

  const handleApply = () => {
    const newSummary = calculateSummary(rooms);
    setSummary(newSummary);
    setIsOpen(false);
    if (onApply) {
      onApply(rooms, newSummary);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="selection-container" ref={containerRef}>
      <div className="traveler-box">
        <input
          type="text"
          className="form-control fw-medium input-box fs-md traveler-input"
          value={summary}
          readOnly
          onFocus={handleInputFocus}
        />
        {isOpen && (
          <div className="traveler-dropdown" ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
            {rooms.map((room, index) => (
              <div key={index} className="room mb-2 p-2 border rounded">
                {hasRooms && <strong>Room {index + 1}</strong>}
                <div className="clouse">
                  <label>Adults</label>
                  <div className="counter">
                    <button
                      className="dec"
                      type="button"
                      onClick={() => handleDecrement(index, "adults")}
                    >
                      -
                    </button>
                    <span className="adult-count">{room.adults}</span>
                    <button
                      className="inc"
                      type="button"
                      onClick={() => handleIncrement(index, "adults")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="clouse">
                  <label>Children</label>
                  <div className="counter">
                    <button
                      className="dec"
                      type="button"
                      onClick={() => handleDecrement(index, "children")}
                    >
                      -
                    </button>
                    <span className="child-count">{room.children}</span>
                    <button
                      className="inc"
                      type="button"
                      onClick={() => handleIncrement(index, "children")}
                    >
                      +
                    </button>
                  </div>
                </div>
                {hasRooms && rooms.length > 1 && (
                  <button
                    className="btn btn-sm btn-light-danger w-100 mt-2"
                    type="button"
                    onClick={() => handleRemoveRoom(index)}
                  >
                    Remove Room
                  </button>
                )}
              </div>
            ))}
            <div className="action-buttons d-flex justify-content-between align-items-center gap-2 mt-2">
              {hasRooms && (
                <button
                  className="btn btn-md btn-light-primary flex-fill"
                  type="button"
                  onClick={handleAddRoom}
                >
                  Add Room
                </button>
              )}
              <button
                className="btn btn-md btn-primary flex-fill"
                type="button"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Backward compatibility hook - deprecated, use TravelerSelector component instead
export function useTravelerDropdown() {
  useEffect(() => {
    console.warn(
      "useTravelerDropdown is deprecated. Please use the TravelerSelector component instead."
    );
  }, []);
}
