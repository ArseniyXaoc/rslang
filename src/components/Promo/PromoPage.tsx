import React, {
  useEffect, useState, useCallback, Fragment,
} from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RootState } from "../../redux/reducer";
import "./style.scss";
import bookImg from "../../assets/images/main/textbook.png";
import dictionaryImg from "../../assets/images/main/dictionary.png";
import gamesImg from "../../assets/images/main/game.png";
import statisticsImg from "../../assets/images/main/statistics.png";
import joinImg from "../../assets/images/main/join.svg";
import { UserType } from "../../redux/user_reducer";

function Teaser({ scroll }: { scroll: (page: number) => void }): React.ReactElement {
  const [englishLvl, setEnglishLvl] = useState<number | null>(null);
  switch (englishLvl) {
    case 0:
      return <Fragment>
        <div className="main__paragraph">{"Только начинаете учить Английский?\
         Не беда - наше приложение интуитивно и поможет быстро нарастить словарный запас"}</div>
        <div className="hero__buttons">
          <div className="main__button main__button--full-width" onClick={() => scroll(1)}>Узнать больше</div>
        </div>
      </Fragment >;
    case 1:
      return <Fragment>
        <div className="main__paragraph">{"Уже знаете английский?\
         Наша платформа поможет Вам поддерживать ваш уровень и расширить словарный запас."}</div>
        <div className="hero__buttons">
          <div className="main__button main__button--full-width" onClick={() => scroll(1)}>Узнать больше</div>
        </div>
      </Fragment >;
    default:
      return <Fragment>
        <h1>Do you speak <br></br><b>English?</b></h1>
        <div className="hero__buttons">
          <div className="main__button" onClick={() => setEnglishLvl(1)}>Yeah, sure!</div>
          <div className="main__button" onClick={() => setEnglishLvl(0)}>Что, простите?</div>
        </div>
      </Fragment>;
  }
}

function PromoPage({ user }: { user: UserType }): React.ReactElement {
  const history = useHistory();
  if (user.id) {
    history.push("/main");
  }
  const numPages = 6;
  const [page, setPage] = useState(0);
  const scroll = (dir: number) => {
    setPage((p) => {
      if (((p + dir) >= 0) && ((p + dir) < numPages)) {
        return p + dir;
      }
      return p;
    });
  };
  const scrollHandler = useCallback((e) => {
    scroll(e.deltaY / Math.abs(e.deltaY));
  }, []);
  useEffect(() => {
    window.addEventListener("wheel", scrollHandler);
    return () => {
      window.addEventListener("wheel", scrollHandler);
    };
  }, [scrollHandler]);
  useEffect(() => {
  }, [page]);
  return <div className="main">
    <div className="main__bg">
    </div>
    <div className="main__empire">
    </div>
    <div className="main__statue">
    </div>
    <div className="main__tower">
    </div>
    {(page < numPages - 1)
      ? <ExpandMoreIcon
        className="main__down"
        onClick={() => scroll(1)}></ExpandMoreIcon>
      : null}
    <div className="main__container" style={{ top: `${-100 * page}vh` }}>
      <div className="main__page" >
        <div className="main__hero">
          <div className="main__text">
            <Teaser scroll={scroll} />
          </div>
          <div className="main__video">
            <div className="main__big-ben">
            </div>
            <iframe src="https://www.youtube.com/embed/IUTRRedYWgw"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero main__hero--reversed">
          <div className="main__text">
            <h1>Учебник</h1>
            <div className="main__paragraph"> {"Слова здесь сгруппированы по разделам\
             в зависимости от уровня сложности"}</div>
          </div>
          <div className="main__video">
            <img src={bookImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero">
          <div className="main__text">
            <h1>Словарь</h1>
            <div className="main__paragraph">{"Заносите изучаемые слова в словарь.\
             Помечайте сложные для вас слова, что потом повторить"}</div>
          </div>
          <div className="main__video">
            <img src={dictionaryImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero main__hero--reversed">
          <div className="main__text">
            <h1>4 игры</h1>
            <div className="main__paragraph">{"Играйте в игры, чтобы сделать процесс\
             запоминания слов легким и увлекательным"}</div>
          </div>
          <div className="main__video">
            <img src={gamesImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero">
          <div className="main__text">
            <h1>Статистика</h1>
            <div className="main__paragraph"> Следите за своим прогрессом с помощью статистики</div>
          </div>
          <div className="main__video">
            <img src={statisticsImg} alt="" ></img>
          </div>
        </div>
      </div>

      <div className="main__page" >
        <div className="main__hero main__hero--reversed">
          <div className="main__text">
            <h1 className={"h1--small"}>Присоединятесь</h1>
            <div className="hero__buttons">
              <RouterLink to={"/signup"}>
                <div className="main__button">Регистрация</div>
              </RouterLink>
              <RouterLink to={"/main"}>
                <div className="main__button">Попробовать</div>
              </RouterLink>
            </div>
          </div>
          <div className="main__video">
            <img src={joinImg} alt="" ></img>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PromoPage);
