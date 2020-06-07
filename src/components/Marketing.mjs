import AppCard from './AppCard.mjs'
const createElement = React.createElement

export default class Marketing extends HTMLElement {
	constructor() {
		super()
        const template = `
            <style>
                app-card {
                    --primary-background-color: transparent;
                    --primary-box-shadow: none
                    --width: 70%;
                    --height: 80px;
                    --display: flex;
                    --align-items: center;
                    margin-bottom: 20px;
                    color: white;
                    border: 1px solid white;
                    padding-left: 5px;
                    font-size: 6vw
                }
                .build-react button {
                    float: right;
                    margin: 10px;
                    background: none;
                    color: white;
                    border-style: none;
                    width: 60px;
                    height: 60px;
                    font-size: 50px;
                }
                button.spin {
                    animation: spin .72s infinite;
                    color: lightgrey
                }
                button.error {
                    color: red;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0Deg)
                    }
                    100% {
                        transform: rotate(360Deg)
                    }
                }
                  
            </style>
            <div class="build-react"></div>
        `
        //No need to make this custom element have a shadowDOM
        //Especially in the case that we need to use react
        //You would need to build react on a shadowDOM as well for it to work right
		this.innerHTML = template
	}

	connectedCallback() {
        // React wont work properly eg(event listeners, onClick) unless the child element of the shadowDOM
        // is a custom element itself
        // customElements.define('app-react', class AppReact extends HTMLElement {
        //     constructor() {
        //         super()
        //         const shadow = this.attachShadow({mode: 'open'})
        //     }
        // })
		ReactDOM.render(
            createElement(ReactMarketing, {name: 'ida'}, null),
            this.querySelector('.build-react')
        );
	}

}

class ReactMarketing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            marketingValues: {
                total : 0,
                totalWeek : 0,
                totalTwoWeeks : 0,
                totalMonth : 0,
                totalLastMonth : 0
            },
            marketingTitle: {
                total : 'Total',
                totalWeek : 'This Week',
                totalTwoWeeks : 'Two weeks ago',
                totalMonth : 'This Month',
                totalLastMonth : 'Last Month'
            },
            spin: false,
            error: false
            
        }
    }
    render() {
        const output = []
        let className = this.state.spin ? 'spin' : ''
        className += this.state.error ? ' error' : ''
        for(let x in this.state.marketingValues) {
            output.push(
                createElement(
                    'app-card',
                    null,
                    createElement('div', {slot: 'default'}, `${this.state.marketingTitle[x]}: ${this.state.marketingValues[x]}`)
                )
            )
        }
        
      return createElement(
          'div',
           null,
           createElement('button', {onClick: this.getAnalytics, className}, ' ↻ '),
          ...output
      )
    }

    componentDidMount() {  
        this.getAnalytics()
    }

    getAnalytics = async() => {
        try {
            this.setState({spin: true, error: false})
            const response = await fetch('/marketing')
            const data = await response.json()
            this.setState({marketingValues: data})
            this.setState({spin: false})
        } catch (error) {
            this.setState({spin: false, error: true})
        }
    }
}