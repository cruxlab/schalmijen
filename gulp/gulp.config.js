/**
 * Created by cleuzinger on 28.06.2016.
 */
export default class Config{

constructor(){
    this._source = '../src/js-client/**/*.js';
    this._build = '../build/';
    this._test = '../test/';
    this._temp = '../.temp/';
    this._debug = '../debug/';
    
    }
    
    get source(){
        return this._source;
    }
    
    get build(){
        return this._build;
    }
    
    get test(){
        return this._test;
    }

    get temp(){
        return this._temp;
    }

    get debug(){
        return this._debug;
    }
}