import Observable from "../utils/Observable";
import { LaunchContext } from "../types";

const context: Observable<LaunchContext> = new Observable(null);

export default context;
