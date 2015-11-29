import 'babel-polyfill';

export default class Lexer {
  static exec(body) {
    return new Promise((resolve, reject) => {
      try {
        const revision = extractLatestRevision(body)
            , date     = extractDate(revision)
            , author   = extractAuthor(revision)
            , comment  = extractComment(revision);

        resolve({ date, author, comment });
      } catch (err) { reject(err); }
    });
  }
}

function extractLatestRevision(html) {
  try {
    const ul_regex = /<ul class="revision-list">[\s\S]+?<\/ul>/
        , li_regex = /<li>[\s\S]+?<\/li>/
        , ul   = ul_regex.exec(html)[0]
        , list = li_regex.exec(ul)[0];

    return list;
  } catch (err) {
    console.error(`error on revision-list`);
    throw err;
  }
}

function extractDate(revision) {
  try {
    const date_regex = /<time[\s\S]+?>([\s\S]+?)<\/time>/
        , date = date_regex.exec(revision)[1];

    return(new Date(date));
  } catch (err) {
    console.error(`error on date`);
    throw err;
  }
}

function extractAuthor(revision) {
  try {
    const div_regex    = /<div[\s\S]+?creator">([\s\S]+?)<\/div>/
        , author_regex = /<a[\s\S]+?>([\s\S]+?)<\/a>/
        , anchor = div_regex.exec(revision)[1]
        , author = author_regex.exec(anchor)[1];

    return(author);
  } catch (err) {
    console.error(`error on author`);
    throw err;
  }
}

function extractComment(revision) {
  try {
    const comment_regex = /<div[\s\S]+?comment">([\s\S]*?)<\/div>/
        , comment = comment_regex.exec(revision)[1];

    return(comment.trim());
  } catch (err) {
    console.error(`error on comment`);
    throw err;
  }
}
