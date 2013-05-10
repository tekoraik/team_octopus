var Namespace = Namespace || {};
Namespace.classes = Namespace.classes || {};

/**
 * AI is a class that implements a basic likelihood based decision AI system.
 * @author Enric Sangrà
 */
;(function( win, doc, ns ){
    "use strict";
    
    var AI;

    ns.classes.AI = function() {
        this.aRules = [];
    };
    
    AI = ns.classes.AI;
        
     
    /**
     * Adds a new rule to the list of rules to be executed when is requested.
     * @param fpRule {Function} is the function to be executed lately as a rule. The function 
     * will be called with a parameter that will be the context of the execution (parameter in
     * AI.prototype.executeRules).
     */
    AI.prototype.addRule = function( fpRule ) {
        this.aRules.push( fpRule );
    }
    
    /**
     * Executes all the rules with the context in order to compute its likelihood.
     * @param oContext {Object} has all the information necessary for the rules to be executed.
     * @return {Number} the likelihood (0 - 100) of the context after executing on it all the 
     * rules in the AI.
     */
    AI.prototype.executeRules = function( oContext ) {
        var i = 0,
            nLikelihood = 100,
            nFactor = 1;
        
        for( i = 0; i < this.aRules.length; i++ ) {
            nFactor = this.aRules[i]( oContext );
            nLikelihood = nLikelihood * nFactor;
        }
        
        return nLikelihood;
    }

}( window, document, Namespace ));