import React, { useCallback, useState, useEffect } from "react";
import strings from "../../../i18n/definitions";
import * as scs from "../Settings.sc";
import * as sc from "../../../components/Theme.sc";
import * as s from "./Content.sc";
import {
  InterestButton,
  variants,
} from "../../../components/interestButton/InterestButton";

export const interestsData = [
  {
    id: 18,
    title: "Business",
  },
  {
    id: 15,
    title: "Culture",
  },
  {
    id: 17,
    title: "Food",
  },
  {
    id: 11,
    title: "Health",
  },
  {
    id: 23,
    title: "Internet",
  },
  {
    id: 13,
    title: "Politics",
  },
  {
    id: 19,
    title: "Satire",
  },
  {
    id: 14,
    title: "Science",
  },
  {
    id: 21,
    title: "Social Sciences",
  },
  {
    id: 10,
    title: "Sport",
  },
  {
    id: 12,
    title: "Technology",
  },
  {
    id: 16,
    title: "Travel",
  },
];
export const nonInterestsData = [
  {
    name: "Art",
    value: false,
    id: "nonArt",
  },
  {
    name: "Business",
    value: false,
    id: "nonBusiness",
  },
  {
    name: "Culture",
    value: false,
    id: "nonCulture",
  },
  {
    name: "Food",
    value: false,
    id: "nonFood",
  },
  {
    name: "Health",
    value: false,
    id: "nonHealth",
  },
  {
    name: "Music",
    value: false,
    id: "nonMusic",
  },
  {
    name: "Politics",
    value: false,
    id: "nonPolitics",
  },
  {
    name: "Satire",
    value: false,
    id: "nonSatire",
  },
  {
    name: "Social",
    value: false,
    id: "nonSocial",
  },
  {
    name: "Science",
    value: false,
    id: "nonScience",
  },
  {
    name: "Social Sciences",
    value: false,
    id: "nonSocialSciences",
  },
  {
    name: "Sport",
    value: false,
    id: "nonSport",
  },
  {
    name: "Travel",
    value: false,
    id: "nonTravel",
  },
  {
    name: "Technology",
    value: false,
    id: "nonTechnology",
  },
];

export const Content = ({ api }) => {
  const [isAllInterests, setIsAllInterests] = useState(false);
  const [isAllNonInterests, setIsAllNonInterests] = useState(false);
  const [nonInterests, setNonInterests] = useState(nonInterestsData);

  const [interests, setInterests] = useState([]);
  const [availableInterests, setAvailableInterests] = useState([]);
  const [subscribedInterests, setSubscribedInterests] = useState([]);
  const [subscribedSearchers, setSubscribedSearchers] = useState([]);

  const handleInterestPress = (currentInterest, isSubscribed) => {
    if (isSubscribed) {
      // unsubscribe
      const filteredSubscribedInterests = subscribedInterests.filter(
        (interest) => interest.id !== currentInterest.id
      );

      setSubscribedInterests(filteredSubscribedInterests);
      setAvailableInterests((prev) => [...prev, currentInterest]);
    } else {
      // subscribe
      const filteredAvailableInterests = availableInterests.filter(
        (interest) => interest.id !== currentInterest.id
      );

      setSubscribedInterests((prev) => [...prev, currentInterest]);
      setAvailableInterests(filteredAvailableInterests);
    }
  };

  //TODO: post subscribeInterests and availableInterests and subscribeSearchers after clicking 'save' to the server

  const handleNonInterestPress = () => {};

  const handleSelectAllInterests = useCallback(
    (type) => {
      return () => {
        const newInterests = (
          type === "nonInterests" ? nonInterests : interests
        ).map((interest) => ({
          ...interest,
          value: type === "nonInterests" ? !isAllNonInterests : !isAllInterests,
        }));

        if (type === "nonInterests") {
          setNonInterests(newInterests);
          setIsAllNonInterests(!isAllNonInterests);
        }
        if (type === "interests") {
          setInterests(newInterests);
          setIsAllInterests(!isAllInterests);
        }
      };
    },
    [interests, nonInterests]
  );

  useEffect(() => {
    api.getAvailableTopics((data) => setAvailableInterests(data));
    api.getSubscribedTopics((data) => setSubscribedInterests(data));
    api.getSubscribedSearchers((data) => setSubscribedSearchers(data));
  }, []);

  useEffect(() => {
    // Create all interests array (sorted by interest's title)
    const sortedInterests = [
      ...availableInterests,
      ...subscribedInterests,
      ...subscribedSearchers,
    ].sort((a, b) => a.title.localeCompare(b.title));

    setInterests(sortedInterests);
  }, [availableInterests, subscribedInterests, subscribedSearchers]);

  return (
    <div>
      <sc.H3>{strings.interests}</sc.H3>
      <div>
        <s.InterestsBox>
          <InterestButton
            variant={
              isAllInterests ? variants.orangeFilled : variants.grayOutlined
            }
            title={strings.all}
            onClick={() => handleSelectAllInterests("interests")}
          />
          <s.AddInterestBtn>
            <s.Plus>
              <span></span>
              <span></span>
            </s.Plus>
            Your own interest
          </s.AddInterestBtn>
        </s.InterestsBox>
        <s.InterestsContainer>
          {interests.map((currentInterest) => {
            const isSubscribed = subscribedInterests.find(
              (interest) => interest.id === currentInterest.id
            );

            return (
              <InterestButton
                key={currentInterest.id}
                variant={
                  isSubscribed ? variants.orangeFilled : variants.grayOutlined
                }
                title={currentInterest.title}
                onClick={() =>
                  handleInterestPress(currentInterest, isSubscribed)
                }
              />
            );
          })}
        </s.InterestsContainer>
      </div>

      <sc.H3>{strings.nonInterests}</sc.H3>
      <div>
        <s.InterestsBox>
          <InterestButton
            variant={
              isAllNonInterests ? variants.grayFilled : variants.grayOutlined
            }
            title={strings.all}
            onClick={() => handleSelectAllInterests("nonInterests")}
          />
          <s.AddInterestBtn>
            <s.Plus>
              <span></span>
              <span></span>
            </s.Plus>
            Your own interest
          </s.AddInterestBtn>
        </s.InterestsBox>
        <s.InterestsContainer>
          {nonInterests.map((item, id) => (
            <InterestButton
              key={id}
              variant={item.value ? variants.grayFilled : variants.grayOutlined}
              title={item.name}
              onClick={() => handleNonInterestPress()}
            />
          ))}
        </s.InterestsContainer>
      </div>
      <scs.SettingButton onClick={() => {}}>{strings.save}</scs.SettingButton>
    </div>
  );
};
