-- Borrowing the basic demo, with modifications, to get Elm working with Bulma:


module Main exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--

import Browser
import Html exposing (Html, a, button, div, footer, img, nav, p, section, text)
import Html.Attributes exposing (attribute, class, height, href, src, width)
import Html.Events exposing (onClick)



-- MAIN


main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model =
    Int


init : Model
init =
    0



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ navLevel
        , section [ class "section" ]
            [ div [ class "container is-max-desktop" ]
                [ navTiles
                , buttonExample model
                ]
            ]
        , finale
        ]



-- Could pass in structured menu data - names, link action, etc.


navLevel : Html Msg
navLevel =
    nav [ class "level" ]
        [ p [ class "level-item has-text-centered" ]
            [ a [ class "link is-info" ] [ text "about me" ] ]
        , p [ class "level-item has-text-centered " ]
            [ a [ class "link is-info" ] [ text "yoga" ] ]
        , p [ class "level-item has-text-centered" ]
            [ a [ class "link is-info" ] [ text "pilates" ] ]
        , p [ class "level-item has-text-centered" ]
            [ a [ class "title" ] [ text "Micki Yoga" ] ]
        , p [ class "level-item has-text-centered" ]
            [ a [ class "link is-info" ] [ text "clinical hypnotherapy" ] ]
        , p [ class "level-item has-text-centered" ]
            [ a [ class "link is-info" ] [ text "sound healing" ] ]
        , p [ class "level-item has-text-centered" ]
            [ a [ class "link is-info" ] [ text "art" ] ]
        ]


navTiles : Html Msg
navTiles =
    let
        tileClass =
            class "tile is-child box is-flex is-align-items-center is-justify-content-center"
    in
    div [ class "tile is-ancestor" ]
        [ div [ class "tile is-parent is-vertical is-4" ]
            [ div [ tileClass ] [ text "about me" ]
            , div [ tileClass ] [ text "sound healing" ]
            ]
        , div [ class "tile is-parent is-vertical" ]
            [ div [ class "tile is-parent" ]
                [ div [ tileClass ] [ text "yoga" ]
                , div [ class "tile is-parent is-vertical" ]
                    [ div [ tileClass ] [ text "pilates" ]
                    , div [ tileClass ] [ text "art" ]
                    ]
                ]
            , div [ class "tile is-parent is-vertical" ]
                [ div [ tileClass ] [ text "clinical hypnotherapy" ] ]
            ]
        ]



-- Standard button example, to test actions


buttonExample : Model -> Html Msg
buttonExample model =
    div
        []
        [ button [ class "button", class "is-primary", onClick Increment ] [ text "+" ]
        , div [] [ text (String.fromInt model) ]
        , button [ class "button", class "is-danger", onClick Decrement ] [ text "-" ]
        ]


finale : Html Msg
finale =
    footer [ class "footer" ]
        [ div [ class "content has-text-centered" ] [ text "copyright 2022 - micaela romero and james manley" ]
        ]
