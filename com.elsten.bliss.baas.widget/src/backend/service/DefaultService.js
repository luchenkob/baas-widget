'use strict';


/**
 * Retrieves all assessments for the specified ID
 *
 * id String 
 * returns List
 **/
exports.get = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "assessment" : {
    "cost" : 0,
    "compliance" : {
      "parts" : [ {
        "summary" : "summary",
        "responses" : [ "", "" ],
        "source" : {
          "policyDescriptor" : "policyDescriptor",
          "category" : "category"
        },
        "state" : "state",
        "detail" : "detail"
      }, {
        "summary" : "summary",
        "responses" : [ "", "" ],
        "source" : {
          "policyDescriptor" : "policyDescriptor",
          "category" : "category"
        },
        "state" : "state",
        "detail" : "detail"
      } ]
    }
  },
  "album" : {
    "artists" : [ "artists", "artists" ],
    "title" : "title",
    "tracks" : [ {
      "path" : {
        "path" : "/First album/1_track-one.mp3",
        "lib" : "/C:/Users/gavin/Music"
      },
      "position" : "position",
      "title" : "title"
    }, {
      "path" : {
        "path" : "/First album/1_track-one.mp3",
        "lib" : "/C:/Users/gavin/Music"
      },
      "position" : "position",
      "title" : "title"
    } ]
  }
}, {
  "assessment" : {
    "cost" : 0,
    "compliance" : {
      "parts" : [ {
        "summary" : "summary",
        "responses" : [ "", "" ],
        "source" : {
          "policyDescriptor" : "policyDescriptor",
          "category" : "category"
        },
        "state" : "state",
        "detail" : "detail"
      }, {
        "summary" : "summary",
        "responses" : [ "", "" ],
        "source" : {
          "policyDescriptor" : "policyDescriptor",
          "category" : "category"
        },
        "state" : "state",
        "detail" : "detail"
      } ]
    }
  },
  "album" : {
    "artists" : [ "artists", "artists" ],
    "title" : "title",
    "tracks" : [ {
      "path" : {
        "path" : "/First album/1_track-one.mp3",
        "lib" : "/C:/Users/gavin/Music"
      },
      "position" : "position",
      "title" : "title"
    }, {
      "path" : {
        "path" : "/First album/1_track-one.mp3",
        "lib" : "/C:/Users/gavin/Music"
      },
      "position" : "position",
      "title" : "title"
    } ]
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieves all jobs for the specified ID
 *
 * id String 
 * returns Job
 **/
exports.get_1 = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "query" : {
    "storage-nodes" : [ {
      "path" : "/First album/1_track-one.mp3",
      "lib" : "/C:/Users/gavin/Music",
      "fields" : {
        "COVER_ART" : {
          "codec" : "jpeg",
          "size-bytes" : 2048290304,
          "width" : 300,
          "height" : 300
        },
        "ALBUM_NAME" : "The Dark Side of the Moon",
        "ARTIST" : "Spinal Tap",
        "TRACK_NAME" : "God Only Knows",
        "TRACK_NUMBER" : "2",
        "YEAR" : "1992",
        "DISC_NUMBER" : "2",
        "COMPILATION" : true,
        "GENRE" : "GENRE",
        "ALBUM_ARTIST" : "ALBUM_ARTIST",
        "empty" : true
      }
    }, {
      "path" : "/First album/1_track-one.mp3",
      "lib" : "/C:/Users/gavin/Music",
      "fields" : {
        "COVER_ART" : {
          "codec" : "jpeg",
          "size-bytes" : 2048290304,
          "width" : 300,
          "height" : 300
        },
        "ALBUM_NAME" : "The Dark Side of the Moon",
        "ARTIST" : "Spinal Tap",
        "TRACK_NAME" : "God Only Knows",
        "TRACK_NUMBER" : "2",
        "YEAR" : "1992",
        "DISC_NUMBER" : "2",
        "COMPILATION" : true,
        "GENRE" : "GENRE",
        "ALBUM_ARTIST" : "ALBUM_ARTIST",
        "empty" : true
      }
    } ]
  },
  "completed-location" : "completed-location",
  "id" : "id",
  "status" : "Completed"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Submit a new assessment
 *
 * body Query Query incorporating details of the storage nodes
 * no response value expected for this operation
 **/
exports.post = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

