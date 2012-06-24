# $ANTLR 3.4 Language.g 2012-06-10 19:58:20

import sys
from antlr3 import *
from antlr3.compat import set, frozenset



# for convenience in actions
HIDDEN = BaseRecognizer.HIDDEN

# token types
EOF=-1
T__10=10
FUNC_NAME=4
NEWLINE=5
STEP_FORWARD=6
TURN_LEFT=7
TURN_RIGHT=8
WS=9


class LanguageLexer(Lexer):

    grammarFileName = "Language.g"
    api_version = 1

    def __init__(self, input=None, state=None):
        if state is None:
            state = RecognizerSharedState()
        super(LanguageLexer, self).__init__(input, state)

        self.delegates = []


                           
        self.errors = []



                             
    def emitErrorMessage(self, message):
         self.errors.append(message)



    # $ANTLR start "T__10"
    def mT__10(self, ):
        try:
            _type = T__10
            _channel = DEFAULT_CHANNEL

            # Language.g:15:7: ( ':' )
            # Language.g:15:9: ':'
            pass 
            self.match(58)



            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "T__10"



    # $ANTLR start "WS"
    def mWS(self, ):
        try:
            _type = WS
            _channel = DEFAULT_CHANNEL

            # Language.g:29:5: ( ( '\\t' | ' ' | '\\u000C' )+ )
            # Language.g:29:7: ( '\\t' | ' ' | '\\u000C' )+
            pass 
            # Language.g:29:7: ( '\\t' | ' ' | '\\u000C' )+
            cnt1 = 0
            while True: #loop1
                alt1 = 2
                LA1_0 = self.input.LA(1)

                if (LA1_0 == 9 or LA1_0 == 12 or LA1_0 == 32) :
                    alt1 = 1


                if alt1 == 1:
                    # Language.g:
                    pass 
                    if self.input.LA(1) == 9 or self.input.LA(1) == 12 or self.input.LA(1) == 32:
                        self.input.consume()
                    else:
                        mse = MismatchedSetException(None, self.input)
                        self.recover(mse)
                        raise mse




                else:
                    if cnt1 >= 1:
                        break #loop1

                    eee = EarlyExitException(1, self.input)
                    raise eee

                cnt1 += 1




            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "WS"



    # $ANTLR start "NEWLINE"
    def mNEWLINE(self, ):
        try:
            _type = NEWLINE
            _channel = DEFAULT_CHANNEL

            # Language.g:32:5: ( ( '\\r' )? '\\n' )
            # Language.g:32:8: ( '\\r' )? '\\n'
            pass 
            # Language.g:32:8: ( '\\r' )?
            alt2 = 2
            LA2_0 = self.input.LA(1)

            if (LA2_0 == 13) :
                alt2 = 1
            if alt2 == 1:
                # Language.g:32:8: '\\r'
                pass 
                self.match(13)




            self.match(10)



            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "NEWLINE"



    # $ANTLR start "STEP_FORWARD"
    def mSTEP_FORWARD(self, ):
        try:
            _type = STEP_FORWARD
            _channel = DEFAULT_CHANNEL

            # Language.g:36:5: ( 's' )
            # Language.g:36:7: 's'
            pass 
            self.match(115)



            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "STEP_FORWARD"



    # $ANTLR start "TURN_LEFT"
    def mTURN_LEFT(self, ):
        try:
            _type = TURN_LEFT
            _channel = DEFAULT_CHANNEL

            # Language.g:40:5: ( 'l' )
            # Language.g:40:7: 'l'
            pass 
            self.match(108)



            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "TURN_LEFT"



    # $ANTLR start "TURN_RIGHT"
    def mTURN_RIGHT(self, ):
        try:
            _type = TURN_RIGHT
            _channel = DEFAULT_CHANNEL

            # Language.g:44:5: ( 'r' )
            # Language.g:44:7: 'r'
            pass 
            self.match(114)



            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "TURN_RIGHT"



    # $ANTLR start "FUNC_NAME"
    def mFUNC_NAME(self, ):
        try:
            _type = FUNC_NAME
            _channel = DEFAULT_CHANNEL

            # Language.g:48:5: ( 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'm' | 'n' | 'o' | 'p' | 'q' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' )
            # Language.g:
            pass 
            if (97 <= self.input.LA(1) <= 107) or (109 <= self.input.LA(1) <= 113) or (116 <= self.input.LA(1) <= 122):
                self.input.consume()
            else:
                mse = MismatchedSetException(None, self.input)
                self.recover(mse)
                raise mse





            self._state.type = _type
            self._state.channel = _channel
        finally:
            pass

    # $ANTLR end "FUNC_NAME"



    def mTokens(self):
        # Language.g:1:8: ( T__10 | WS | NEWLINE | STEP_FORWARD | TURN_LEFT | TURN_RIGHT | FUNC_NAME )
        alt3 = 7
        LA3 = self.input.LA(1)
        if LA3 == 58:
            alt3 = 1
        elif LA3 == 9 or LA3 == 12 or LA3 == 32:
            alt3 = 2
        elif LA3 == 10 or LA3 == 13:
            alt3 = 3
        elif LA3 == 115:
            alt3 = 4
        elif LA3 == 108:
            alt3 = 5
        elif LA3 == 114:
            alt3 = 6
        elif LA3 == 97 or LA3 == 98 or LA3 == 99 or LA3 == 100 or LA3 == 101 or LA3 == 102 or LA3 == 103 or LA3 == 104 or LA3 == 105 or LA3 == 106 or LA3 == 107 or LA3 == 109 or LA3 == 110 or LA3 == 111 or LA3 == 112 or LA3 == 113 or LA3 == 116 or LA3 == 117 or LA3 == 118 or LA3 == 119 or LA3 == 120 or LA3 == 121 or LA3 == 122:
            alt3 = 7
        else:
            nvae = NoViableAltException("", 3, 0, self.input)

            raise nvae


        if alt3 == 1:
            # Language.g:1:10: T__10
            pass 
            self.mT__10()



        elif alt3 == 2:
            # Language.g:1:16: WS
            pass 
            self.mWS()



        elif alt3 == 3:
            # Language.g:1:19: NEWLINE
            pass 
            self.mNEWLINE()



        elif alt3 == 4:
            # Language.g:1:27: STEP_FORWARD
            pass 
            self.mSTEP_FORWARD()



        elif alt3 == 5:
            # Language.g:1:40: TURN_LEFT
            pass 
            self.mTURN_LEFT()



        elif alt3 == 6:
            # Language.g:1:50: TURN_RIGHT
            pass 
            self.mTURN_RIGHT()



        elif alt3 == 7:
            # Language.g:1:61: FUNC_NAME
            pass 
            self.mFUNC_NAME()








 



def main(argv, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr):
    from antlr3.main import LexerMain
    main = LexerMain(LanguageLexer)

    main.stdin = stdin
    main.stdout = stdout
    main.stderr = stderr
    main.execute(argv)



if __name__ == '__main__':
    main(sys.argv)
