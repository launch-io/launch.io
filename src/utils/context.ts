import { LaunchContext } from "../types";
import Observable from "../utils/Observable";

const context: Observable<LaunchContext> = new Observable(null);

export default context;
