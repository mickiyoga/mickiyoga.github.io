-- Simple Elm app with Bulma styling, to keep things easy to adapt and maintain


module Main exposing (..)

import Browser
import Html exposing (Html, a, button, div, footer, li, nav, p, section, text, ul)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)



-- MAIN


main : Program () Model Msg
main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Chapter msg =
    { title : String
    , colour : String
    , image : String
    , description : Html msg
    }


about =
    Chapter
        "about me"
        ""
        ""
    <|
        div [ class "content" ]
            [ p [] [ text "Yoga guide and personal trainer, Micaela 'Micki' Romero." ]
            , p [] [ text "I am based in South East Queensland." ]
            , p [] [ text "My style and own view of teaching asanas (yoga poses) can be described as" ]
            , ul []
                [ li [] [ text "martial arts meets yogi" ]
                , li [] [ text "healing, gentle ray of sunshine" ]
                , li [] [ text "challenging with a focus on alignment & breath" ]
                , li [] [ text "mellow and wise" ]
                , li [] [ text "soulful and sweaty" ]
                , li [] [ text "focused and grounding" ]
                , li [] [ text "playful flows" ]
                , li [] [ text "strong and calming" ]
                , li [] [ text "peaceful moving meditation" ]
                , li [] [ text "powerful, deep and nourishing" ]
                , li [] [ text "enthusiastic, playful and energetic" ]
                , li [] [ text "knowledgeable" ]
                , li [] [ text "calm & centred with a new perception" ]
                ]
            , p []
                [ text "Try various ranges from my cool-as-a-cucumber   "
                , a [ onClick (Open yoga) ] [ text "yoga" ]
                , text ", cardio yoga, or powerhouse personal training"
                ]
            ]


yoga =
    Chapter "yoga" "yellow" "" <|
        div [] []


pilates =
    Chapter "pilates" "" "" <|
        div [] []


hypno =
    Chapter "clinical hypnotherapy" "" "" <|
        div [] []


sound =
    Chapter "sound healing" "" "" <|
        div [] []


art =
    Chapter "art" "" "" <|
        div [] []


type alias Model =
    Maybe (Chapter Msg)


init : Model
init =
    Nothing



-- UPDATE


type Msg
    = Home
    | Open (Chapter Msg)
    | Close (Chapter Msg)


update : Msg -> Model -> Model
update msg model =
    case msg of
        Home ->
            Nothing

        Close _ ->
            Nothing

        Open chapter ->
            Just chapter



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ navLevel
        , section [ class "section" ]
            [ div [ class "container is-max-desktop" ]
                [ navTiles
                ]
            ]
        , chapterDetail model
        , finale
        ]


navLevelItem : String -> String -> Msg -> Html Msg
navLevelItem navClass title msg =
    p [ class "level-item has-text-centered" ]
        [ a [ class navClass, onClick msg ] [ text title ] ]


navLevelChapterItem : Chapter Msg -> Html Msg
navLevelChapterItem chapter =
    navLevelItem "link is-info" chapter.title (Open chapter)


navLevelTitleItem : String -> Html Msg
navLevelTitleItem title =
    navLevelItem "title" title Home


navLevel : Html Msg
navLevel =
    nav [ class "level" ]
        [ navLevelChapterItem about
        , navLevelChapterItem yoga
        , navLevelChapterItem pilates
        , navLevelTitleItem "Micki Yoga"
        , navLevelChapterItem hypno
        , navLevelChapterItem sound
        , navLevelChapterItem art
        ]


navTile : Chapter Msg -> Html Msg
navTile chapter =
    let
        tileClass =
            class "tile is-child box is-flex is-align-items-center is-justify-content-center"
    in
    div [ tileClass, onClick (Open chapter) ] [ text chapter.title ]


navTiles : Html Msg
navTiles =
    div [ class "tile is-ancestor" ]
        [ div [ class "tile is-parent is-vertical is-4" ]
            [ navTile about
            , navTile sound
            ]
        , div [ class "tile is-parent is-vertical" ]
            [ div [ class "tile is-parent" ]
                [ navTile yoga
                , div [ class "tile is-parent is-vertical" ]
                    [ navTile pilates
                    , navTile art
                    ]
                ]
            , div [ class "tile is-parent is-vertical" ]
                [ navTile hypno ]
            ]
        ]


chapterDetail : Model -> Html Msg
chapterDetail model =
    let
        modalClass =
            case model of
                Nothing ->
                    "modal"

                _ ->
                    "modal is-active"
    in
    div
        [ class
            modalClass
        ]
        [ div [ class "modal-background", onClick Home ] []
        , div [ class "modal-content" ]
            [ div [ class "box" ]
                [ (Maybe.withDefault about model).description
                ]
            ]
        , button [ class "modal-close is-large" ] []
        ]


finale : Html Msg
finale =
    footer [ class "footer" ]
        [ div [ class "content has-text-centered" ] [ text "copyright 2022 - micaela romero and james manley" ]
        ]
